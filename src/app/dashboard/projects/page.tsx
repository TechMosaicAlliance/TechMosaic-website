"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search, ArrowLeft, X, Filter, Eye, Edit, Trash2, Lock, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getPermissions, UserRole } from "@/lib/permissions";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const impactAreas = [
  "Digital Solutions & Innovation",
  "Humanity Hub & Missions",
  "Climate Impact Projects",
  "Intelligent Systems & AI Innovation",
  "Skills & Capacity Development",
];

const serviceTypes = [
  "Web Development",
  "Copywriting",
  "UI/UX Design",
  "Branding & Identity",
  "Project Management",
  "Graphic Design",
];


interface Project {
  id: number;
  slug: string;
  name: string;
  client: string;
  status: string;
  date: string;
  impactArea: string;
  serviceType: string;
  image?: string;
}

function ProjectsPageContent() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  
  // Get user permissions
  const permissions = user ? getPermissions(user.role as UserRole) : null;

  // Get filter values from query params
  const searchQuery = searchParams.get('search') || "";
  const selectedImpactArea = searchParams.get('impactArea') || "All";
  const selectedStatus = searchParams.get('status') || "All";
  const selectedServiceType = searchParams.get('serviceType') || "All";

  // Sync search input with query param on mount/change
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Function to update query params
  const updateQueryParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`/dashboard/projects?${params.toString()}`);
  }, [searchParams, router]);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    impactArea: "",
    serviceType: "",
    status: "Ongoing",
    date: "",
    projectOverview: "",
    scopeOfWork: "",
    projectSummary: "",
    image: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedImpactArea !== 'All') params.append('impactArea', selectedImpactArea);
      if (selectedStatus !== 'All') params.append('status', selectedStatus);
      if (selectedServiceType !== 'All') params.append('serviceType', selectedServiceType);

      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedImpactArea, selectedStatus, selectedServiceType]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Debounced search query param update
  useEffect(() => {
    const timer = setTimeout(() => {
      updateQueryParams({ search: searchInput || null });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, updateQueryParams]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesImpactArea =
      selectedImpactArea === "All" || project.impactArea === selectedImpactArea;
    
    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;
    
    const matchesServiceType =
      selectedServiceType === "All" || project.serviceType === selectedServiceType;

    return matchesSearch && matchesImpactArea && matchesStatus && matchesServiceType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Ongoing":
        return "bg-blue-100 text-blue-700";
      case "Planning":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleNewProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PNG, JPG, and WEBP images are allowed');
      return;
    }

    setUploadingImage(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentComplete);
        }
      });

      // Handle completion
      const uploadPromise = new Promise<any>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              resolve(data);
            } catch (error) {
              reject(new Error('Invalid response'));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
      });

      const data = await uploadPromise;
      setNewProject(prev => ({
        ...prev,
        image: data.url,
      }));
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
    }
  };

  const handleCreateProject = async () => {
    if (!permissions?.canCreateProjects) {
      toast.error('You do not have permission to create projects');
      return;
    }

    if (saving) return;

    setSaving(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to create project');
        return;
      }

      toast.success('Project created successfully!');
      // Refresh projects list
      await fetchProjects();
      setIsDrawerOpen(false);
      
      // Reset form
      setNewProject({
        name: "",
        client: "",
        impactArea: "",
        serviceType: "",
        status: "Ongoing",
        date: "",
        projectOverview: "",
        scopeOfWork: "",
        projectSummary: "",
        image: "",
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <p className="text-sm text-gray-600">
                  {permissions?.canEditProjects ? 'Manage your projects' : 'View projects'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <div className="text-right">
                  <div className="text-xs text-gray-500">Logged in as</div>
                  <div className="text-sm font-semibold text-gray-900">{user.role}</div>
                </div>
              )}
              {permissions?.canCreateProjects ? (
                <Button onClick={() => setIsDrawerOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              ) : (
                <Button disabled variant="outline" className="cursor-not-allowed">
                  <Lock className="w-4 h-4 mr-2" />
                  View Only
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by name or client..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                Filters
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Impact Area Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Impact Area
                </label>
                <select
                  value={selectedImpactArea}
                  onChange={(e) => updateQueryParams({ impactArea: e.target.value === "All" ? null : e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="All">All Impact Areas</option>
                  {impactAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => updateQueryParams({ status: e.target.value === "All" ? null : e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>

              {/* Service Type Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Service Type
                </label>
                <select
                  value={selectedServiceType}
                  onChange={(e) => updateQueryParams({ serviceType: e.target.value === "All" ? null : e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="All">All Service Types</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:opacity-0 transition-opacity"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white/20">
                            {project.name.charAt(0)}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {/* Role Badge */}
                    <div className="absolute top-3 right-3">
                      {!permissions?.canEditProjects && (
                        <span className="px-2 py-1 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold rounded flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          View Only
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600">{project.client}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Service:</span>
                        <span className="font-medium text-gray-700">
                          {project.serviceType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Impact:</span>
                        <span className="font-medium text-gray-700 text-right">
                          {project.impactArea}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(project.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/projects/${project.slug}`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-3"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        {permissions?.canEditProjects && (
                          <Link href={`/dashboard/projects/${project.slug}`}>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              title="Edit project"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                        
                        {permissions?.canDeleteProjects && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found</p>
          </div>
        )}
      </main>

      {/* Drawer for New Project */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Project
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Project Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Image
                </label>
                
                {newProject.image ? (
                  <div className="relative group">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={newProject.image}
                        alt="Project preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          disabled={uploadingImage}
                        >
                          {uploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Change
                            </>
                          )}
                        </Button>
                      </label>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setNewProject({ ...newProject, image: '' })}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      {uploadingImage ? (
                        <>
                          <Loader2 className="w-10 h-10 text-primary mx-auto mb-3 animate-spin" />
                          <p className="text-sm text-gray-600 mb-3">
                            Uploading to Cloudinary...
                          </p>
                          {/* Progress Bar */}
                          <div className="w-full max-w-xs mx-auto">
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 font-medium">
                              {uploadProgress}%
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            Click to upload project image
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG or WEBP
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                )}
              </div>

              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleNewProjectChange}
                  placeholder="Enter project name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Client/Partner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="client"
                  value={newProject.client}
                  onChange={handleNewProjectChange}
                  placeholder="Enter client or partner name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Impact Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Impact Area <span className="text-red-500">*</span>
                </label>
                <select
                  name="impactArea"
                  value={newProject.impactArea}
                  onChange={handleNewProjectChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Impact Area</option>
                  {impactAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceType"
                  value={newProject.serviceType}
                  onChange={handleNewProjectChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select Service Type</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleNewProjectChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="Planning">Planning</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Project Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={newProject.date}
                  onChange={handleNewProjectChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Project Overview */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="projectOverview"
                  value={newProject.projectOverview}
                  onChange={handleNewProjectChange}
                  placeholder="Brief overview of the project..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Scope of Work */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Scope of Work <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="scopeOfWork"
                  value={newProject.scopeOfWork}
                  onChange={handleNewProjectChange}
                  placeholder="Detailed scope of work, deliverables, and milestones..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Project Summary */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="projectSummary"
                  value={newProject.projectSummary}
                  onChange={handleNewProjectChange}
                  placeholder="Summary of outcomes, impact, and key achievements..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1"
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateProject} className="flex-1" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading projects...</p>
      </div>
    }>
      <ProjectsPageContent />
    </Suspense>
  );
}


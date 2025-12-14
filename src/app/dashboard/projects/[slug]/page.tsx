"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash2, Upload, Plus, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const impactAreas = [
  "Digital Solutions & Innovation",
  "Humanity Hub & Missions",
  "Climate Impact Projects",
  "Intelligent Systems & AI Innovation",
  "Skills & Capacity Development",
];

const serviceTypes = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Branding & Identity",
  "Digital Marketing",
  "Consulting",
];

const toolLogos = [
  "Figma",
  "Canva",
  "WordPress",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
];

const sampleProjects: Record<string, any> = {
  "ecommerce-redesign": {
    name: "E-Commerce Platform for Local Artisans",
    client: "ShopFlow Inc",
    status: "Completed",
    date: "2024-01-15",
    impactArea: "Digital Solutions & Innovation",
    serviceType: "Web Development",
    projectOverview:
      "Complete redesign of the e-commerce platform with modern UI/UX principles and improved conversion rates.",
    scopeOfWork:
      "User research, wireframing, UI design, frontend development, payment integration, testing, and deployment.",
    projectSummary:
      "Successfully launched a modern e-commerce platform that increased conversion rates by 45% and improved user satisfaction scores by 60%.",
    projectUrl: "https://shopflow.example.com",
    tools: ["Figma", "React", "Node.js"],
    mediaFiles: [],
    caseStudyUrl: "",
  },
  "mobile-banking-app": {
    name: "Mobile Banking for Rural Communities",
    client: "FinTech Solutions",
    status: "Ongoing",
    date: "2024-02-20",
    impactArea: "Digital Solutions & Innovation",
    serviceType: "Mobile App Development",
    projectOverview:
      "Developing a secure and user-friendly mobile banking application with advanced features for rural communities.",
    scopeOfWork:
      "Requirements gathering, security architecture, UI/UX design, mobile app development (iOS & Android), backend API development, security testing.",
    projectSummary:
      "Currently in development phase with 70% completion. Beta testing shows 95% user satisfaction and strong security compliance.",
    projectUrl: "https://fintech.example.com",
    tools: ["Figma", "React", "Node.js"],
    mediaFiles: [],
    caseStudyUrl: "",
  },
  "refugee-support-platform": {
    name: "Refugee Support Platform",
    client: "Humanity First",
    status: "Completed",
    date: "2024-03-10",
    impactArea: "Humanity Hub & Missions",
    serviceType: "Web Development",
    projectOverview:
      "Created comprehensive platform to connect refugees with essential services, resources, and community support.",
    scopeOfWork:
      "Platform architecture, multilingual interface design, resource database development, community features, mobile optimization.",
    projectSummary:
      "Platform now serves over 5,000 refugees across 15 countries, providing access to critical services and community support.",
    projectUrl: "https://humanityfirst.example.com",
    tools: ["WordPress", "Canva"],
    mediaFiles: [],
    caseStudyUrl: "",
  },
  "climate-tracking-dashboard": {
    name: "Climate Data Tracking Dashboard",
    client: "Green Earth Initiative",
    status: "Ongoing",
    date: "2024-03-25",
    impactArea: "Climate Impact Projects",
    serviceType: "Web Development",
    projectOverview:
      "Building an advanced analytics dashboard with real-time climate data visualization and reporting capabilities.",
    scopeOfWork:
      "Data integration, dashboard design, real-time visualization development, reporting system, API development.",
    projectSummary:
      "Dashboard tracking climate metrics across 50+ regions, providing actionable insights for environmental organizations.",
    projectUrl: "https://greenearth.example.com",
    tools: ["React", "Python", "Figma"],
    mediaFiles: [],
    caseStudyUrl: "",
  },
  "ai-education-assistant": {
    name: "AI-Powered Education Assistant",
    client: "EduTech Labs",
    status: "Completed",
    date: "2024-02-05",
    impactArea: "Intelligent Systems & AI Innovation",
    serviceType: "Mobile App Development",
    projectOverview:
      "AI-powered mobile application that provides personalized learning assistance and study recommendations.",
    scopeOfWork:
      "AI model development, mobile app design, content management system, recommendation engine, performance analytics.",
    projectSummary:
      "App adopted by 10,000+ students, showing 35% improvement in learning outcomes and 80% user retention rate.",
    projectUrl: "https://edutech.example.com",
    tools: ["React", "Python", "Adobe XD"],
    mediaFiles: [],
    caseStudyUrl: "",
  },
  "skills-training-portal": {
    name: "Skills Training Portal",
    client: "Career Development Corp",
    status: "Ongoing",
    date: "2024-04-01",
    impactArea: "Skills & Capacity Development",
    serviceType: "Web Development",
    projectOverview:
      "Comprehensive online platform for skills training, certification, and career development resources.",
    scopeOfWork:
      "Learning management system, video hosting, assessment tools, certification system, progress tracking.",
    projectSummary:
      "Platform delivering training to 2,000+ learners with 500+ courses and 85% course completion rate.",
    projectUrl: "https://careerdev.example.com",
    tools: ["WordPress", "Canva", "Figma"],
    mediaFiles: [],
    caseStudyUrl: "",
  },
};

function ProjectEditPageContent() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [project, setProject] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newTool, setNewTool] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaUploadProgress, setMediaUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  // Fetch project from API
  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;

      try {
        const response = await fetch(`/api/projects/${slug}`);
        if (response.ok) {
          const data = await response.json();
          const projectData = {
            ...data.project,
            tools: data.project.tools || [],
            mediaFiles: data.project.mediaFiles || [],
          };
          setProject(projectData);
          setFormData(projectData);
        } else {
          // Fallback to sample data if not found
          const fallbackProject = {
            ...(sampleProjects[slug] || sampleProjects["ecommerce-redesign"]),
            tools: (sampleProjects[slug] || sampleProjects["ecommerce-redesign"]).tools || [],
            mediaFiles: (sampleProjects[slug] || sampleProjects["ecommerce-redesign"]).mediaFiles || [],
          };
          setProject(fallbackProject);
          setFormData(fallbackProject);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        // Fallback to sample data
        const fallbackProject = {
          ...(sampleProjects[slug] || sampleProjects["ecommerce-redesign"]),
          tools: (sampleProjects[slug] || sampleProjects["ecommerce-redesign"]).tools || [],
          mediaFiles: (sampleProjects[slug] || sampleProjects["ecommerce-redesign"]).mediaFiles || [],
        };
        setProject(fallbackProject);
        setFormData(fallbackProject);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!formData || !slug || saving) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.error || 'Failed to save project');
        return;
      }

      toast.success('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleAddTool = () => {
    if (newTool && formData.tools && !formData.tools.includes(newTool)) {
      setFormData({
        ...formData,
        tools: [...formData.tools, newTool],
      });
      setNewTool("");
    }
  };

  const handleRemoveTool = (tool: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((t: string) => t !== tool),
    });
  };

  const handleAddMedia = () => {
    if (mediaUrl && formData.mediaFiles && !formData.mediaFiles.includes(mediaUrl)) {
      setFormData({
        ...formData,
        mediaFiles: [...formData.mediaFiles, mediaUrl],
      });
      setMediaUrl("");
    }
  };

  const handleRemoveMedia = (url: string) => {
    setFormData({
      ...formData,
      mediaFiles: formData.mediaFiles.filter((m: string) => m !== url),
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
      setFormData((prev: any) => ({
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

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB for media)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadingMedia(true);
    setMediaUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Use XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setMediaUploadProgress(percentComplete);
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
      setFormData((prev: any) => ({
        ...prev,
        mediaFiles: [...(prev.mediaFiles || []), data.url],
      }));
      toast.success('Media uploaded successfully!');
    } catch (error) {
      console.error('Error uploading media:', error);
      toast.error('Failed to upload media');
    } finally {
      setUploadingMedia(false);
      setMediaUploadProgress(0);
    }
  };

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/projects">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button onClick={handleSave} size="sm" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Project Image Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Project Image
            </label>
            
            {formData.image ? (
              <div className="space-y-3">
                <div className="relative group">
                  <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                    <Image
                      src={formData.image}
                      alt="Project preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
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
                        onClick={(e) => {
                          e.preventDefault();
                          e.currentTarget.previousElementSibling?.dispatchEvent(new MouseEvent('click'));
                        }}
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Change Image
                          </>
                        )}
                      </Button>
                    </label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      disabled={uploadingImage}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
                
                {/* Upload Progress Bar when changing image */}
                {uploadingImage && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">
                        Uploading to Cloudinary
                      </span>
                      <span className="text-sm font-bold text-blue-700">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
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
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-12 h-12 text-primary mx-auto mb-3 animate-spin" />
                      <p className="text-sm text-gray-600 mb-3">
                        Uploading to Cloudinary...
                      </p>
                      {/* Progress Bar */}
                      <div className="w-full max-w-xs mx-auto">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-700 mt-2 font-semibold">
                          {uploadProgress}%
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
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

          {/* Form Grid */}
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter project name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Client Name */}
              <div>
                <label
                  htmlFor="client"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Client/Partner Name
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Enter client name"
                />
              </div>

              {/* Project Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Project Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Impact Area */}
              <div>
                <label
                  htmlFor="impactArea"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Impact Area
                </label>
                <select
                  id="impactArea"
                  name="impactArea"
                  value={formData.impactArea}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  {impactAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="serviceType"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Service Type
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option>Planning</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>

              {/* Project URL */}
              <div>
                <label
                  htmlFor="projectUrl"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Project URL
                </label>
                <input
                  type="url"
                  id="projectUrl"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tools & Technologies Used
              </label>
              <div className="flex gap-2 mb-3">
                <select
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a tool</option>
                  {toolLogos.map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
                <Button onClick={handleAddTool} type="button">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.tools || []).map((tool: string) => (
                  <div
                    key={tool}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {tool}
                    </span>
                    <button
                      onClick={() => handleRemoveTool(tool)}
                      className="text-gray-500 hover:text-red-600"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Overview */}
            <div>
              <label
                htmlFor="projectOverview"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Project Overview
              </label>
              <textarea
                id="projectOverview"
                name="projectOverview"
                value={formData.projectOverview}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Brief overview of the project..."
              />
            </div>

            {/* Scope of Work */}
            <div>
              <label
                htmlFor="scopeOfWork"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Scope of Work
              </label>
              <textarea
                id="scopeOfWork"
                name="scopeOfWork"
                value={formData.scopeOfWork}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Detailed scope of work, deliverables, and milestones..."
              />
            </div>

            {/* Project Summary */}
            <div>
              <label
                htmlFor="projectSummary"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Project Summary
              </label>
              <textarea
                id="projectSummary"
                name="projectSummary"
                value={formData.projectSummary}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Summary of outcomes, impact, and key achievements..."
              />
            </div>

            {/* Media Files */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Project Media (Pictures & Videos)
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="Enter media URL or upload..."
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button onClick={handleAddMedia} type="button" disabled={uploadingMedia}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add URL
                  </Button>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                      disabled={uploadingMedia}
                    />
                    <Button type="button" variant="outline" disabled={uploadingMedia} asChild>
                      <span>
                        {uploadingMedia ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload File
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
                
                {/* Upload Progress Bar */}
                {uploadingMedia && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">
                        Uploading media to Cloudinary
                      </span>
                      <span className="text-sm font-bold text-blue-700">
                        {mediaUploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full transition-all duration-300 ease-out"
                        style={{ width: `${mediaUploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              {(formData.mediaFiles || []).length > 0 && (
                <div className="space-y-2">
                  {(formData.mediaFiles || []).map((url: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700 truncate flex-1">
                        {url}
                      </span>
                      <button
                        onClick={() => handleRemoveMedia(url)}
                        className="ml-2 text-gray-500 hover:text-red-600"
                        type="button"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Case Study URL */}
            <div>
              <label
                htmlFor="caseStudyUrl"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Case Study URL (Optional)
              </label>
              <input
                type="url"
                id="caseStudyUrl"
                name="caseStudyUrl"
                value={formData.caseStudyUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="https://example.com/case-study"
              />
            </div>
          </div>
        </div>

        {/* Save Button at Bottom */}
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} size="lg" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}

// Wrap with ProtectedRoute - requires canViewProjects permission
export default function ProjectEditPage() {
  return (
    <ProtectedRoute requiredPermission="canViewProjects">
      <ProjectEditPageContent />
    </ProtectedRoute>
  );
}


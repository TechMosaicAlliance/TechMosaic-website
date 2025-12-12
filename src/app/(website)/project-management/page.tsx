"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { Search, Filter, Calendar, Building2, CheckCircle, Clock, Layers } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectsGridSkeleton } from "@/components/ui/skeletons/ProjectCardSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

const impactAreas = [
  "All",
  "Digital Solutions & Innovation",
  "Humanity Hub & Missions",
  "Climate Impact Projects",
  "Intelligent Systems & AI Innovation",
  "Skills & Capacity Development",
];

const serviceTypes = [
  "All",
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Branding & Identity",
  "Graphic Design",
  "Copywriting",
  "Project Management",
];

const statuses = ["All", "Completed", "Ongoing", "Planning"];

// Tool logos mapping
const toolLogos: Record<string, string> = {
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  WordPress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Canva: "/assets/tools/canva.svg",
  "Adobe XD": "/assets/tools/adobe-xd.svg",
};

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
  projectOverview?: string;
  scopeOfWork?: string;
  projectSummary?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  tools?: string[];
  mediaFiles?: string[];
}

function ProjectManagementPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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

    router.push(`/project-management?${params.toString()}`);
  }, [searchParams, router]);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  // Debounced search query param update
  useEffect(() => {
    const timer = setTimeout(() => {
      updateQueryParams({ search: searchInput || null });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, updateQueryParams]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectOverview?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesImpactArea =
      selectedImpactArea === "All" || project.impactArea === selectedImpactArea;

    const matchesStatus =
      selectedStatus === "All" || project.status === selectedStatus;

    const matchesServiceType =
      selectedServiceType === "All" || project.serviceType === selectedServiceType;

    return matchesSearch && matchesImpactArea && matchesStatus && matchesServiceType;
  });

  // Group projects by impact area
  const projectsByImpactArea = impactAreas
    .filter((area) => area !== "All")
    .map((area) => ({
      area,
      projects: filteredProjects.filter((p) => p.impactArea === area),
    }))
    .filter((group) => group.projects.length > 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "Ongoing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Planning":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "Ongoing":
        return <Clock className="w-4 h-4" />;
      case "Planning":
        return <Layers className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Global Impact Areas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover how we&apos;re making a difference across the world through innovative projects and solutions
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>{projects.length} Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>{projects.filter(p => p.status === 'Completed').length} Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>{projects.filter(p => p.status === 'Ongoing').length} Ongoing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name, client, or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filter Options */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters || 'hidden lg:grid'}`}>
            {/* Impact Area Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Impact Area
              </label>
              <select
                value={selectedImpactArea}
                onChange={(e) => updateQueryParams({ impactArea: e.target.value === "All" ? null : e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              >
                {impactAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => updateQueryParams({ status: e.target.value === "All" ? null : e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={selectedServiceType}
                onChange={(e) => updateQueryParams({ serviceType: e.target.value === "All" ? null : e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedImpactArea !== "All" || selectedStatus !== "All" || selectedServiceType !== "All") && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  Search: &quot;{searchQuery}&quot;
                  <button
                    onClick={() => {
                      setSearchInput("");
                      updateQueryParams({ search: null });
                    }}
                    className="ml-2 hover:text-primary-dark"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedImpactArea !== "All" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                  {selectedImpactArea}
                  <button
                    onClick={() => updateQueryParams({ impactArea: null })}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedStatus !== "All" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  Status: {selectedStatus}
                  <button
                    onClick={() => updateQueryParams({ status: null })}
                    className="ml-2 hover:text-green-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedServiceType !== "All" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                  {selectedServiceType}
                  <button
                    onClick={() => updateQueryParams({ serviceType: null })}
                    className="ml-2 hover:text-purple-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <ProjectsGridSkeleton count={6} />
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              onClick={() => {
                setSearchInput("");
                updateQueryParams({ search: null, impactArea: null, status: null, serviceType: null });
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-16">
            {projectsByImpactArea.map(({ area, projects }, index) => (
              <div key={area} className="scroll-mt-20" id={area.toLowerCase().replace(/\s+/g, '-')}>
                {/* Impact Area Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{area}</h2>
                      <p className="text-gray-600">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</p>
                    </div>
                  </div>
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/project-management/${project.slug}`}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        {/* Project Image */}
                        <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 group-hover:opacity-0 transition-opacity"></div>
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-6xl font-bold text-white/20">
                                {project.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 right-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {getStatusIcon(project.status)}
                              {project.status}
                            </span>
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                              {project.name}
                            </h3>
                            
                            {/* Client */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Building2 className="w-4 h-4" />
                              <span>{project.client}</span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(project.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Project Overview */}
                          {project.projectOverview && (
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                              {project.projectOverview}
                            </p>
                          )}

                          {/* Service Type Tag */}
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {project.serviceType}
                            </span>
                          </div>

                          {/* Tools Used */}
                          {project.tools && project.tools.length > 0 && (
                            <div className="pt-4 border-t border-gray-100">
                              <p className="text-xs font-semibold text-gray-500 mb-2">
                                Tools Used:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.tools.slice(0, 4).map((tool, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg border border-gray-200"
                                    title={tool}
                                  >
                                    {toolLogos[tool] && (
                                      <img
                                        src={toolLogos[tool]}
                                        alt={tool}
                                        className="w-4 h-4"
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <span className="text-xs text-gray-700">{tool}</span>
                                  </div>
                                ))}
                                {project.tools.length > 4 && (
                                  <span className="text-xs text-gray-500">
                                    +{project.tools.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* View Details Button */}
                          <div className="mt-4">
                            <span className="text-primary font-semibold text-sm group-hover:underline">
                              View Details →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Results Summary */}
      {!loading && filteredProjects.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredProjects.length}</span> of{" "}
              <span className="font-bold text-gray-900">{projects.length}</span> projects
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProjectManagementPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <ProjectsGridSkeleton count={6} />
      </div>
    }>
      <ProjectManagementPageContent />
    </Suspense>
  );
}


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Building2, CheckCircle, Clock, Layers, ExternalLink, FileText, Target, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ProjectDetailSkeleton } from "@/components/ui/skeletons/ProjectDetailSkeleton";

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProjects, setSimilarProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${params.slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Project not found");
        } else {
          throw new Error('Failed to fetch project');
        }
        return;
      }
      
      const data = await response.json();
      setProject(data.project);
      
      // Fetch similar projects after getting the current project
      if (data.project) {
        fetchSimilarProjects(data.project);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProjects = async (currentProject: Project) => {
    try {
      // Fetch projects with same impact area or service type, excluding current project
      const params = new URLSearchParams();
      if (currentProject.impactArea) {
        params.append('impactArea', currentProject.impactArea);
      }
      
      const response = await fetch(`/api/projects?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch similar projects');
      
      const data = await response.json();
      // Filter out current project and limit to 2
      const similar = data.projects
        .filter((p: Project) => p.slug !== currentProject.slug)
        .slice(0, 2);
      
      // If we don't have 2 projects, try fetching by service type
      if (similar.length < 2 && currentProject.serviceType) {
        const serviceParams = new URLSearchParams();
        serviceParams.append('serviceType', currentProject.serviceType);
        const serviceResponse = await fetch(`/api/projects?${serviceParams.toString()}`);
        if (serviceResponse.ok) {
          const serviceData = await serviceResponse.json();
          const additionalProjects = serviceData.projects
            .filter((p: Project) => 
              p.slug !== currentProject.slug && 
              !similar.some((sp: Project) => sp.slug === p.slug)
            )
            .slice(0, 2 - similar.length);
          similar.push(...additionalProjects);
        }
      }
      
      setSimilarProjects(similar);
    } catch (error) {
      console.error('Error fetching similar projects:', error);
    }
  };

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
        return <CheckCircle className="w-5 h-5" />;
      case "Ongoing":
        return <Clock className="w-5 h-5" />;
      case "Planning":
        return <Layers className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The project you&apos;re looking for doesn&apos;t exist."}</p>
          <Link href="/project-management">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/project-management">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${getStatusColor(
                    project.status
                  )}`}
                >
                  {getStatusIcon(project.status)}
                  {project.status}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.name}
              </h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-lg">
                  <Building2 className="w-5 h-5" />
                  <span>Client: {project.client}</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(project.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {project.impactArea}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {project.serviceType}
                </span>
              </div>
            </div>

            {/* Project Image */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-8xl font-bold text-white/20">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            {project.projectOverview && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.projectOverview}
                </p>
              </div>
            )}

            {/* Scope of Work */}
            {project.scopeOfWork && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Scope of Work</h2>
                </div>
                <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.scopeOfWork}
                </div>
              </div>
            )}

            {/* Project Summary */}
            {project.projectSummary && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Project Summary</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.projectSummary}
                </p>
              </div>
            )}

            {/* Media Files */}
            {project.mediaFiles && project.mediaFiles.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.mediaFiles.map((media, index) => (
                    <div key={index} className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={media}
                        alt={`${project.name} - Media ${index + 1}`}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <span className="text-gray-900 font-medium">Visit Project</span>
                  </a>
                )}
                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-gray-900 font-medium">View Case Study</span>
                  </a>
                )}
                {!project.projectUrl && !project.caseStudyUrl && (
                  <p className="text-sm text-gray-500">No links available</p>
                )}
              </div>
            </div>

            {/* Tools Used */}
            {project.tools && project.tools.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      {toolLogos[tool] && (
                        <Image
                          src={toolLogos[tool]}
                          alt={tool}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                          unoptimized
                        />
                      )}
                      <span className="font-medium text-gray-900">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Impact Area</div>
                  <div className="text-gray-900">{project.impactArea}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Service Type</div>
                  <div className="text-gray-900">{project.serviceType}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-500 mb-1">Status</div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusIcon(project.status)}
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Projects Section */}
      {similarProjects.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Interested in Similar Projects?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore more of our work and see how we&apos;re making a global impact
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {similarProjects.map((similarProject) => (
                <Link
                  key={similarProject.id}
                  href={`/project-management/${similarProject.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    {/* Project Image */}
                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 group-hover:opacity-0 transition-opacity"></div>
                      {similarProject.image ? (
                        <Image
                          src={similarProject.image}
                          alt={similarProject.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold text-white/20">
                            {similarProject.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(
                            similarProject.status
                          )}`}
                        >
                          {getStatusIcon(similarProject.status)}
                          {similarProject.status}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {similarProject.name}
                        </h3>
                        
                        {/* Client */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Building2 className="w-4 h-4" />
                          <span>{similarProject.client}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(similarProject.date).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Project Overview */}
                      {similarProject.projectOverview && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {similarProject.projectOverview}
                        </p>
                      )}

                      {/* Service Type Tag */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {similarProject.serviceType}
                        </span>
                      </div>

                      {/* View Project Link */}
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/project-management">
                <Button size="lg" variant="outline">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


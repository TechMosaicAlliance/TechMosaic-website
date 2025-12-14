"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FolderKanban,
  Users,
  CheckCircle2,
  Target,
  Globe,
  Loader2,
  ArrowLeft,
  Zap,
  Eye,
  Activity,
  Clock,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { getPermissions, UserRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  projects: {
    total: number;
    byStatus: Array<{ status: string; count: number }>;
    byImpactArea: Array<{ impactArea: string; count: number }>;
    byServiceType: Array<{ serviceType: string; count: number }>;
    byMonth: Array<{ month: string; count: number }>;
    recent: Array<{ name: string; status: string; date: string; createdAt: string }>;
    completed: number;
    active: number;
    planning: number;
    completionRate: number;
    live: number;
  };
  users: {
    total: number;
    byRole: Array<{ role: string; count: number }>;
    byStatus: Array<{ status: string; count: number }>;
    byMonth: Array<{ month: string; count: number }>;
    recent: Array<{ name: string; role: string; status: string; createdAt: string }>;
    active: number;
  };
  tools: {
    popular: Array<{ tool: string; count: number }>;
  };
  pageVisits: {
    total: number;
    uniqueVisitors: number;
    today: number;
    thisMonth: number;
    avgPerDay: number;
    byPage: Array<{ pagePath: string; count: number }>;
    byDay: Array<{ date: string; count: number }>;
    topReferrers: Array<{ referrer: string; count: number }>;
  };
}

export default function AnalyticsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const permissions = user ? getPermissions(user.role as UserRole) : null;

  if (isLoading || !user || isLoadingData || !analyticsData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!permissions?.canViewAnalytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You don&apos;t have permission to view analytics.
            </p>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-xs text-gray-600">Comprehensive insights and metrics</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 lg:px-8 py-8">
        
        {/* SECTION 1: OVERVIEW METRICS */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Overview Metrics</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard
              icon={Eye}
              label="Total Visits"
              value={analyticsData.pageVisits.total.toLocaleString()}
              gradient="from-blue-500 to-blue-600"
            />
            <MetricCard
              icon={Users}
              label="Unique Visitors"
              value={analyticsData.pageVisits.uniqueVisitors.toLocaleString()}
              gradient="from-purple-500 to-purple-600"
            />
            <MetricCard
              icon={Activity}
              label="Today"
              value={analyticsData.pageVisits.today.toLocaleString()}
              gradient="from-green-500 to-green-600"
            />
            <MetricCard
              icon={FolderKanban}
              label="Projects"
              value={analyticsData.projects.total.toString()}
              gradient="from-orange-500 to-orange-600"
            />
            <MetricCard
              icon={CheckCircle2}
              label="Completed"
              value={analyticsData.projects.completed.toString()}
              gradient="from-emerald-500 to-emerald-600"
            />
            <MetricCard
              icon={Target}
              label="Completion Rate"
              value={`${analyticsData.projects.completionRate}%`}
              gradient="from-pink-500 to-pink-600"
            />
          </div>
        </div>

        {/* SECTION 2: TRAFFIC ANALYTICS */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Traffic Analytics</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Traffic Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">14-Day Traffic Trend</h3>
                  <p className="text-xs text-gray-600">Daily visitor activity</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last 14 days</span>
                </div>
              </div>
              <div className="flex items-end justify-between h-64 gap-2 pb-4">
                {analyticsData.pageVisits.byDay.slice(-14).map((day, i) => {
                  const maxCount = Math.max(...analyticsData.pageVisits.byDay.slice(-14).map(d => d.count));
                  const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                  const date = new Date(day.date);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md hover:from-primary/90 hover:to-primary/70 transition-all cursor-pointer relative group/bar"
                          style={{ height: `${Math.max(height, 4)}%`, minHeight: '8px' }}
                        >
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                            <div className="font-semibold">{day.count} visits</div>
                            <div className="text-[10px] text-gray-300 mt-0.5">
                              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-medium text-gray-500 text-center">
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Top Pages</h3>
                  <p className="text-xs text-gray-600">Most visited pages</p>
                </div>
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {analyticsData.pageVisits.byPage.slice(0, 6).map((page, i) => {
                  const maxCount = Math.max(...analyticsData.pageVisits.byPage.map(p => p.count));
                  const width = (page.count / maxCount) * 100;
                  return (
                    <div key={i} className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold text-white",
                          i === 0 && "bg-gradient-to-br from-yellow-400 to-yellow-500",
                          i === 1 && "bg-gradient-to-br from-gray-400 to-gray-500",
                          i === 2 && "bg-gradient-to-br from-amber-600 to-amber-700",
                          i >= 3 && "bg-gradient-to-br from-gray-300 to-gray-400"
                        )}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                            {page.pagePath === '/' ? 'Home' : page.pagePath}
                          </div>
                        </div>
                        <div className="text-sm font-bold text-gray-900 shrink-0">
                          {page.count}
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                          style={{ width: `${width}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROJECT ANALYTICS */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Project Analytics</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Distribution */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Status Distribution</h3>
                  <p className="text-xs text-gray-600">Projects by status</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {analyticsData.projects.byStatus.map((status, i) => {
                  const percentage = (status.count / analyticsData.projects.total) * 100;
                  const statusColors = {
                    'Completed': 'from-emerald-500 to-emerald-600',
                    'Ongoing': 'from-orange-500 to-orange-600',
                    'Planning': 'from-blue-500 to-blue-600',
                    'Live': 'from-green-500 to-green-600',
                  };
                  const colorClass = statusColors[status.status as keyof typeof statusColors] || 'from-gray-500 to-gray-600';
                  
                  return (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{status.status}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{status.count}</span>
                          <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full bg-gradient-to-r rounded-full transition-all duration-500", colorClass)}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Service Types */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Service Types</h3>
                  <p className="text-xs text-gray-600">Projects by service</p>
                </div>
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {analyticsData.projects.byServiceType.slice(0, 6).map((service, i) => {
                  const maxCount = Math.max(...analyticsData.projects.byServiceType.map(s => s.count));
                  const width = (service.count / maxCount) * 100;
                  return (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 truncate pr-2">{service.serviceType}</span>
                        <span className="text-sm font-bold text-gray-900 shrink-0">{service.count}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500" 
                          style={{ width: `${width}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact Areas */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Impact Areas</h3>
                  <p className="text-xs text-gray-600">Projects by impact</p>
                </div>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {analyticsData.projects.byImpactArea.slice(0, 6).map((area, i) => {
                  const maxCount = Math.max(...analyticsData.projects.byImpactArea.map(a => a.count));
                  const width = (area.count / maxCount) * 100;
                  return (
                    <div key={i} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 truncate pr-2">{area.impactArea}</span>
                        <span className="text-sm font-bold text-gray-900 shrink-0">{area.count}</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500" 
                          style={{ width: `${width}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: USERS & TOOLS */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-lg font-bold text-gray-900">Users & Tools</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Analytics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">User Statistics</h3>
                  <p className="text-xs text-gray-600">User overview and roles</p>
                </div>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {analyticsData.users.total}
                  </div>
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {analyticsData.users.active}
                  </div>
                  <div className="text-xs font-medium text-emerald-700 uppercase tracking-wide">Active</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {analyticsData.users.total - analyticsData.users.active}
                  </div>
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Inactive</div>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">By Role</div>
                {analyticsData.users.byRole.map((role, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-sm text-gray-700">{role.role}</span>
                    <span className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {role.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tools */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Popular Tools</h3>
                  <p className="text-xs text-gray-600">Most used tools</p>
                </div>
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
              {analyticsData.tools.popular.length > 0 ? (
                <div className="space-y-4">
                  {analyticsData.tools.popular.slice(0, 8).map((tool, i) => {
                    const maxCount = Math.max(...analyticsData.tools.popular.map(t => t.count));
                    const width = (tool.count / maxCount) * 100;
                    return (
                      <div key={i} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{tool.tool}</span>
                          <span className="text-sm font-bold text-gray-900">{tool.count}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500" 
                            style={{ width: `${width}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No tool data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 5: RECENT PROJECTS */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-lg font-bold text-gray-900">Recent Projects</h2>
            </div>
            <Link href="/dashboard/projects">
              <Button variant="ghost" size="sm" className="text-xs">
                View All
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analyticsData.projects.recent.map((project, i) => {
                const statusColors = {
                  'Completed': {
                    bg: 'bg-emerald-50',
                    text: 'text-emerald-700',
                    border: 'border-emerald-200',
                    accent: 'bg-emerald-500'
                  },
                  'Ongoing': {
                    bg: 'bg-orange-50',
                    text: 'text-orange-700',
                    border: 'border-orange-200',
                    accent: 'bg-orange-500'
                  },
                  'Planning': {
                    bg: 'bg-blue-50',
                    text: 'text-blue-700',
                    border: 'border-blue-200',
                    accent: 'bg-blue-500'
                  },
                  'Live': {
                    bg: 'bg-green-50',
                    text: 'text-green-700',
                    border: 'border-green-200',
                    accent: 'bg-green-500'
                  }
                };
                const colors = statusColors[project.status as keyof typeof statusColors] || statusColors.Planning;
                
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-md group",
                      colors.bg,
                      colors.border
                    )}
                  >
                    <div className={cn("w-1.5 h-12 rounded-full shrink-0", colors.accent)} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate mb-1 group-hover:text-primary transition-colors">
                        {project.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(project.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className={cn(
                        "inline-flex px-2.5 py-1 text-xs font-semibold rounded-full",
                        colors.text,
                        colors.bg
                      )}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// Metric Card Component
function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  gradient 
}: { 
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn(
          "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform",
          gradient
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
        {value}
      </div>
    </div>
  );
}

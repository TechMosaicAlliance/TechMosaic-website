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
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getPermissions, UserRole } from "@/lib/permissions";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!permissions?.canViewAnalytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-card shadow border border-border p-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold text-foreground">Analytics Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        
        {/* SECTION 1: OVERVIEW METRICS */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Overview
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Visits</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analyticsData.pageVisits.total.toLocaleString()}
              </div>
            </div>

            <div className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Visitors</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analyticsData.pageVisits.uniqueVisitors.toLocaleString()}
              </div>
            </div>

            <div className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Today</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analyticsData.pageVisits.today.toLocaleString()}
              </div>
            </div>

            <div className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <FolderKanban className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Projects</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analyticsData.projects.total}
              </div>
            </div>

            <div className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Completed</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analyticsData.projects.completed}
              </div>
            </div>

            <div className="bg-card border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Rate</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {analyticsData.projects.completionRate}%
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: TRAFFIC ANALYTICS */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Traffic Analytics
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Traffic Chart */}
            <div className="lg:col-span-2 bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                14-Day Traffic Trend
              </h3>
              <div className="flex items-end justify-between h-48 gap-1">
                {analyticsData.pageVisits.byDay.slice(-14).map((day, i) => {
                  const maxCount = Math.max(...analyticsData.pageVisits.byDay.slice(-14).map(d => d.count));
                  const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary/20 hover:bg-primary transition-colors cursor-pointer relative group"
                        style={{ height: `${height}%`, minHeight: '4px' }}
                      >
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {day.count} visits
                        </div>
                      </div>
                      <div className="text-[9px] text-muted-foreground">
                        {new Date(day.date).getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Top Pages
              </h3>
              <div className="space-y-3">
                {analyticsData.pageVisits.byPage.slice(0, 6).map((page, i) => {
                  const maxCount = Math.max(...analyticsData.pageVisits.byPage.map(p => p.count));
                  const width = (page.count / maxCount) * 100;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-primary">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-foreground truncate mb-1">{page.pagePath}</div>
                        <div className="w-full bg-muted h-1.5">
                          <div className="bg-primary h-1.5" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                      <div className="text-xs font-bold text-foreground shrink-0 w-10 text-right">
                        {page.count}
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
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Project Analytics
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Status Distribution */}
            <div className="bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Status Distribution
              </h3>
              <div className="space-y-3">
                {analyticsData.projects.byStatus.map((status, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-foreground">{status.status}</span>
                      <span className="text-xs font-bold text-foreground">{status.count}</span>
                    </div>
                    <div className="w-full bg-muted h-2">
                      <div
                        className={`h-2 ${
                          status.status === 'Completed' ? 'bg-green-600' :
                          status.status === 'Ongoing' ? 'bg-orange-500' :
                          'bg-blue-500'
                        }`}
                        style={{
                          width: `${(status.count / analyticsData.projects.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Types */}
            <div className="bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Service Types
              </h3>
              <div className="space-y-3">
                {analyticsData.projects.byServiceType.slice(0, 6).map((service, i) => {
                  const maxCount = Math.max(...analyticsData.projects.byServiceType.map(s => s.count));
                  const width = (service.count / maxCount) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-foreground truncate">{service.serviceType}</span>
                        <span className="text-xs font-bold text-foreground">{service.count}</span>
                      </div>
                      <div className="w-full bg-muted h-2">
                        <div className="bg-primary h-2" style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact Areas */}
            <div className="bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Impact Areas
              </h3>
              <div className="space-y-3">
                {analyticsData.projects.byImpactArea.slice(0, 6).map((area, i) => {
                  const maxCount = Math.max(...analyticsData.projects.byImpactArea.map(a => a.count));
                  const width = (area.count / maxCount) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-foreground truncate">{area.impactArea}</span>
                        <span className="text-xs font-bold text-foreground">{area.count}</span>
                      </div>
                      <div className="w-full bg-muted h-2">
                        <div className="bg-primary h-2" style={{ width: `${width}%` }} />
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
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Users & Tools
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* User Analytics */}
            <div className="bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                User Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/30">
                  <div className="text-xl font-bold text-foreground mb-1">
                    {analyticsData.users.total}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">Total</div>
                </div>
                <div className="text-center p-3 bg-green-50">
                  <div className="text-xl font-bold text-green-600 mb-1">
                    {analyticsData.users.active}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">Active</div>
                </div>
                <div className="text-center p-3 bg-muted/30">
                  <div className="text-xl font-bold text-foreground mb-1">
                    {analyticsData.users.total - analyticsData.users.active}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase">Inactive</div>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-border">
                {analyticsData.users.byRole.map((role, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{role.role}</span>
                    <span className="font-bold text-foreground">{role.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tools */}
            <div className="bg-card border border-border p-5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Popular Tools
              </h3>
              {analyticsData.tools.popular.length > 0 ? (
                <div className="space-y-3">
                  {analyticsData.tools.popular.slice(0, 8).map((tool, i) => {
                    const maxCount = Math.max(...analyticsData.tools.popular.map(t => t.count));
                    const width = (tool.count / maxCount) * 100;
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-foreground">{tool.tool}</span>
                          <span className="text-xs font-bold text-foreground">{tool.count}</span>
                        </div>
                        <div className="w-full bg-muted h-2">
                          <div className="bg-primary h-2" style={{ width: `${width}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  No tool data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 5: RECENT PROJECTS */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
              Recent Projects
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="bg-card border border-border p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {analyticsData.projects.recent.map((project, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-1 h-12 shrink-0"
                    style={{
                      backgroundColor: project.status === 'Completed' ? '#16a34a' :
                                     project.status === 'Ongoing' ? '#f97316' : '#3b82f6'
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate mb-1">{project.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className={`px-2 py-1 text-[10px] font-semibold shrink-0 ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'Ongoing' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {project.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

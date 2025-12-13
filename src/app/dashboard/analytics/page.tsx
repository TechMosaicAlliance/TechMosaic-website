"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FolderKanban,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  PlayCircle,
  Target,
  Globe,
  Wrench,
  Loader2,
  ArrowLeft,
  Calendar,
  Award,
  Zap,
  Sparkles,
  Eye,
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

  const statusColors: Record<string, string> = {
    Completed: "bg-green-600",
    Ongoing: "bg-blue-600",
    Planning: "bg-yellow-600",
  };

  const getStatusColor = (status: string) => {
    return statusColors[status] || "bg-gray-600";
  };

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split("-");
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-foreground">Analytics</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <TrendingUp className="w-3 h-3 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">{analyticsData.pageVisits.total.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Page Visits</div>
          </div>

          <div className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-4 h-4 text-primary" />
              <Sparkles className="w-3 h-3 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">{analyticsData.pageVisits.uniqueVisitors.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Visitors</div>
          </div>

          <div className="bg-primary p-4 text-primary-foreground">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold">{analyticsData.pageVisits.today.toLocaleString()}</div>
            <div className="text-[10px] uppercase tracking-wide mt-1 opacity-90">Today</div>
          </div>

          <div className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-2">
              <FolderKanban className="w-4 h-4 text-primary" />
              <CheckCircle2 className="w-3 h-3 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">{analyticsData.projects.total}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Projects</div>
          </div>

          <div className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-bold text-green-600">{analyticsData.projects.completionRate}%</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{analyticsData.projects.completed}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Completed</div>
          </div>

          <div className="bg-card border border-border p-4 hover:border-primary transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-4 h-4 text-primary" />
              <TrendingUp className="w-3 h-3 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-foreground">{analyticsData.users.total}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Users</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Projects by Status */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target className="w-3 h-3 text-primary" />
              Projects by Status
            </h3>
            <div className="space-y-3">
              {analyticsData.projects.byStatus.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{item.status}</span>
                    <span className="text-sm font-bold text-foreground">{item.count}</span>
                  </div>
                  <div className="w-full bg-muted h-2">
                    <div
                      className={`h-2 ${getStatusColor(item.status)}`}
                      style={{
                        width: `${(item.count / analyticsData.projects.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects by Impact Area */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-3 h-3 text-primary" />
              Projects by Impact Area
            </h3>
            <div className="space-y-3">
              {analyticsData.projects.byImpactArea.slice(0, 5).map((item) => (
                <div key={item.impactArea} className="flex items-center justify-between">
                  <span className="text-sm text-foreground flex-1 truncate mr-4">
                    {item.impactArea}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted h-2">
                      <div
                        className="bg-primary h-2"
                        style={{
                          width: `${
                            (item.count / analyticsData.projects.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground w-8 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Projects by Service Type */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Wrench className="w-3 h-3 text-primary" />
              Service Types
            </h3>
            <div className="space-y-3">
              {analyticsData.projects.byServiceType.map((item) => (
                <div key={item.serviceType} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.serviceType}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-muted h-2">
                      <div
                        className="bg-primary h-2"
                        style={{
                          width: `${
                            (item.count / analyticsData.projects.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground w-8 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Tools */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-3 h-3 text-primary" />
              Popular Tools
            </h3>
            <div className="space-y-3">
              {analyticsData.tools.popular.length > 0 ? (
                analyticsData.tools.popular.map((item, index) => (
                  <div key={item.tool} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{item.tool}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tool data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Page Visit Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Top Pages */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Globe className="w-3 h-3 text-primary" />
              Top Pages
            </h3>
              <div className="space-y-3">
                {analyticsData.pageVisits.byPage.map((page, index) => (
                  <div key={page.pagePath} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-6 h-6 bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span className="text-sm text-foreground truncate">{page.pagePath}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground ml-4">
                      {page.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          {/* Top Referrers */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-primary" />
              Traffic Sources
            </h3>
              <div className="space-y-3">
                {analyticsData.pageVisits.topReferrers.length > 0 ? (
                  analyticsData.pageVisits.topReferrers.map((referrer, index) => (
                    <div key={referrer.referrer} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-6 h-6 bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span className="text-sm text-foreground truncate max-w-xs">
                          {referrer.referrer || 'Direct'}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{referrer.count}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No referrer data available</p>
                )}
              </div>
          </div>
        </div>

        {/* Traffic Timeline */}
        <div className="bg-card border border-border p-4 mb-6">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Calendar className="w-3 h-3 text-primary" />
            Daily Traffic (30 Days)
          </h3>
            <div className="space-y-2">
              {analyticsData.pageVisits.byDay.slice().reverse().map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <span className="text-[10px] text-muted-foreground w-16">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div className="flex-1 bg-muted h-5">
                    <div
                      className="bg-primary h-5 flex items-center justify-end pr-2"
                      style={{
                        width: `${
                          analyticsData.pageVisits.byDay.length > 0 &&
                          Math.max(...analyticsData.pageVisits.byDay.map((d) => d.count)) > 0
                            ? (day.count /
                                Math.max(
                                  ...analyticsData.pageVisits.byDay.map((d) => d.count)
                                )) *
                              100
                            : 0
                        }%`,
                      }}
                    >
                      <span className="text-[10px] font-bold text-primary-foreground">{day.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Timeline Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Projects Timeline */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <FolderKanban className="w-3 h-3 text-primary" />
              Projects (12 Months)
            </h3>
            <div className="space-y-2">
              {analyticsData.projects.byMonth.slice().reverse().map((item) => (
                <div key={item.month} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-14">
                    {formatMonth(item.month)}
                  </span>
                  <div className="flex-1 bg-muted h-5">
                    <div
                      className="bg-primary h-5 flex items-center justify-end pr-2"
                        style={{
                          width: `${
                            (item.count /
                              Math.max(
                                ...analyticsData.projects.byMonth.map((m) => m.count)
                              )) *
                            100
                          }%`,
                        }}
                      >
                      <span className="text-[10px] font-bold text-primary-foreground">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users Timeline */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-3 h-3 text-primary" />
              Users (12 Months)
            </h3>
            <div className="space-y-2">
              {analyticsData.users.byMonth.slice().reverse().map((item) => (
                <div key={item.month} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-14">
                    {formatMonth(item.month)}
                  </span>
                  <div className="flex-1 bg-muted h-5">
                    <div
                      className="bg-primary h-5 flex items-center justify-end pr-2"
                        style={{
                          width: `${
                            analyticsData.users.byMonth.length > 0 &&
                            Math.max(...analyticsData.users.byMonth.map((m) => m.count)) > 0
                              ? (item.count /
                                  Math.max(
                                    ...analyticsData.users.byMonth.map((m) => m.count)
                                  )) *
                                100
                              : 0
                          }%`,
                        }}
                      >
                      <span className="text-[10px] font-bold text-primary-foreground">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Recent Projects */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-3 h-3 text-primary" />
              Recent Projects
            </h3>
              <div className="space-y-3">
                {analyticsData.projects.recent.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{project.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "Ongoing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          {/* Recent Users */}
          <div className="bg-card border border-border p-4">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-3 h-3 text-primary" />
              Recent Users
            </h3>
              <div className="space-y-3">
                {analyticsData.users.recent.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {user.role} • {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-3 h-3 text-primary" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Live Projects</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {analyticsData.projects.live}
            </div>
          </div>

          <div className="bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">In Planning</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {analyticsData.projects.planning}
            </div>
          </div>

          <div className="bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-1">
              <PlayCircle className="w-3 h-3 text-primary" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Active Users</span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {analyticsData.users.active}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

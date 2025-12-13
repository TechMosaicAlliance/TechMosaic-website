"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Users, 
  FolderKanban,
  LogOut,
  Loader2,
  Shield,
  BarChart3,
  Settings,
  Eye,
  Edit3
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getPermissions, getRoleCapabilities, UserRole } from "@/lib/permissions";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  // Get user permissions
  const permissions = user ? getPermissions(user.role as UserRole) : null;
  const capabilities = user ? getRoleCapabilities(user.role as UserRole) : [];

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-600">{user.role}</div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
              Logout
            </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* User Info Card */}
        <div className="bg-primary rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h2>
              <p className="text-white/90 text-lg">
                You&apos;re logged in as <span className="font-semibold">{user.role}</span>
              </p>
              <p className="text-white/70 text-sm mt-2">
                Email: {user.email} • Username: @{user.username}
              </p>
            </div>
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-12 h-12" />
            </div>
          </div>
                      </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Users Management - Super Admin Only */}
            {permissions?.canViewUsers && (
              <Link href="/dashboard/users">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-7 h-7 text-white" />
                    </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">User Management</h4>
                    <p className="text-sm text-gray-600">
                    Manage users, roles, and permissions
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                    Super Admin Only
                  </span>
                </div>
              </Link>
            )}

            {/* Projects Management */}
            {permissions?.canViewProjects && (
              <Link href="/dashboard/projects">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FolderKanban className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Projects</h4>
                  <p className="text-sm text-gray-600">
                    {permissions.canEditProjects ? 'View and manage your projects' : 'View projects'}
                  </p>
                  {!permissions.canEditProjects && (
                    <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded flex items-center gap-1 w-fit">
                      <Eye className="w-3 h-3" />
                      View Only
                    </span>
                  )}
                  {permissions.canEditProjects && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded flex items-center gap-1 w-fit">
                      <Edit3 className="w-3 h-3" />
                      Full Access
                    </span>
                  )}
                </div>
              </Link>
            )}

            {/* Analytics */}
            {permissions?.canViewAnalytics && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Analytics</h4>
                <p className="text-sm text-gray-600">
                  View system analytics and reports
                </p>
              </div>
            )}

            {/* Settings - Super Admin Only */}
            {permissions?.canAccessSettings && (
              <Link href="/admin/settings">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Settings className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Settings</h4>
                  <p className="text-sm text-gray-600">
                    Configure system settings
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                    Super Admin Only
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Role Permissions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  user.role === 'Super Admin' ? 'bg-purple-50' :
                  user.role === 'Admin' ? 'bg-blue-50' :
                  user.role === 'Editor' ? 'bg-green-50' :
                  'bg-gray-50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  user.role === 'Super Admin' ? 'bg-purple-500' :
                  user.role === 'Admin' ? 'bg-blue-500' :
                  user.role === 'Editor' ? 'bg-green-500' :
                  'bg-gray-500'
                }`}></div>
                <span className="text-sm text-gray-700">{capability}</span>
              </div>
            ))}
          </div>

          {/* Restrictions Notice */}
          {user.role !== 'Super Admin' && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> {
                  user.role === 'Admin' ? 'You cannot manage users. Contact a Super Admin for user management access.' :
                  user.role === 'Editor' ? 'You cannot delete projects or manage users. Contact an Admin for additional permissions.' :
                  'You have view-only access. Contact an Admin to request edit permissions.'
                }
              </p>
            </div>
          )}
        </div>

        {/* Status Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-xs text-gray-600 mb-1">Account Status</div>
            <div className={`text-lg font-bold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {user.status}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-xs text-gray-600 mb-1">Member Since</div>
            <div className="text-lg font-bold text-gray-900">
              {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-xs text-gray-600 mb-1">Last Updated</div>
            <div className="text-lg font-bold text-gray-900">
              {new Date(user.updated_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

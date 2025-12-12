"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { canAccessRoute, UserRole } from "@/lib/permissions";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: 'canViewProjects' | 'canEditProjects' | 'canViewUsers' | 'canViewAnalytics';
  allowedRoles?: UserRole[];
  fallbackPath?: string;
}

export function ProtectedRoute({
  children,
  requiredPermission,
  allowedRoles,
  fallbackPath = "/dashboard",
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated - redirect to login
      if (!isAuthenticated || !user) {
        router.push('/login');
        return;
      }

      // Check if user's role is allowed
      if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        setHasAccess(false);
        setChecking(false);
        return;
      }

      // Check specific permission if required
      if (requiredPermission) {
        const { getPermissions } = require('@/lib/permissions');
        const permissions = getPermissions(user.role as UserRole);
        if (!permissions[requiredPermission]) {
          setHasAccess(false);
          setChecking(false);
          return;
        }
      }

      setHasAccess(true);
      setChecking(false);
    }
  }, [isAuthenticated, isLoading, user, router, requiredPermission, allowedRoles]);

  // Loading state
  if (isLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Access denied
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h1>
            
            <p className="text-gray-600 mb-6">
              You don&apos;t have permission to access this page. Your current role (<strong>{user?.role}</strong>) doesn&apos;t include the required permissions.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Need access?</strong> Contact a Super Admin to update your permissions.
              </p>
            </div>

            <div className="space-y-3">
              <Link href={fallbackPath}>
                <Button className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}


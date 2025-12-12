// Role-Based Access Control (RBAC) Permissions

export type UserRole = 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';

export interface Permission {
  canAccessDashboard: boolean;
  canViewProjects: boolean;
  canCreateProjects: boolean;
  canEditProjects: boolean;
  canDeleteProjects: boolean;
  canViewUsers: boolean;
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canResetPasswords: boolean;
  canViewAnalytics: boolean;
  canAccessSettings: boolean;
  canManageSystem: boolean;
}

// Define permissions for each role
const rolePermissions: Record<UserRole, Permission> = {
  'Super Admin': {
    canAccessDashboard: true,
    canViewProjects: true,
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: true,
    canViewUsers: true,
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canResetPasswords: true,
    canViewAnalytics: true,
    canAccessSettings: true,
    canManageSystem: true,
  },
  'Admin': {
    canAccessDashboard: true,
    canViewProjects: true,
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: true,
    canViewUsers: false,      // ❌ Admin cannot manage users
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canResetPasswords: false,
    canViewAnalytics: true,
    canAccessSettings: false,
    canManageSystem: false,
  },
  'Editor': {
    canAccessDashboard: true,
    canViewProjects: true,
    canCreateProjects: true,
    canEditProjects: true,
    canDeleteProjects: false,  // ❌ Cannot delete
    canViewUsers: false,
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canResetPasswords: false,
    canViewAnalytics: false,
    canAccessSettings: false,
    canManageSystem: false,
  },
  'Viewer': {
    canAccessDashboard: true,
    canViewProjects: true,
    canCreateProjects: false,  // ❌ View only
    canEditProjects: false,
    canDeleteProjects: false,
    canViewUsers: false,
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canResetPasswords: false,
    canViewAnalytics: false,
    canAccessSettings: false,
    canManageSystem: false,
  },
};

// Get permissions for a specific role
export function getPermissions(role: UserRole | string | null | undefined): Permission {
  // Default to Viewer permissions if role is invalid or undefined
  if (!role || !(role in rolePermissions)) {
    return rolePermissions['Viewer'];
  }
  return rolePermissions[role as UserRole];
}

// Check if a role has a specific permission
export function hasPermission(role: UserRole | string | null | undefined, permission: keyof Permission): boolean {
  if (!role || !(role in rolePermissions)) {
    return false;
  }
  return rolePermissions[role as UserRole][permission];
}

// Check if user can access a specific route
export function canAccessRoute(role: UserRole | string | null | undefined, route: string): boolean {
  const permissions = getPermissions(role);

  // Safety check - if permissions is undefined, deny access
  if (!permissions) {
    return false;
  }

  // Define route access based on permissions
  const routeAccess: Record<string, boolean> = {
    '/dashboard': permissions.canAccessDashboard,
    '/dashboard/users': permissions.canViewUsers,
    '/dashboard/projects': permissions.canViewProjects,
    '/dashboard/analytics': permissions.canViewAnalytics,
    '/dashboard/settings': permissions.canAccessSettings,
  };

  // Check if route matches any defined route
  for (const [path, allowed] of Object.entries(routeAccess)) {
    if (route.startsWith(path)) {
      return allowed;
    }
  }

  // Default to not allowed for undefined routes
  return false;
}

// Get user-friendly role description
export function getRoleDescription(role: UserRole | string | null | undefined): string {
  const descriptions: Record<UserRole, string> = {
    'Super Admin': 'Full system access with user management capabilities',
    'Admin': 'Manage projects and content without user management access',
    'Editor': 'Create and edit projects, but cannot delete',
    'Viewer': 'View-only access to projects and dashboard',
  };
  
  if (!role || !(role in descriptions)) {
    return descriptions['Viewer'];
  }
  
  return descriptions[role as UserRole];
}

// Get role capabilities list
export function getRoleCapabilities(role: UserRole | string | null | undefined): string[] {
  const permissions = getPermissions(role);
  const capabilities: string[] = [];

  // Safety check - if permissions is undefined, return empty array
  if (!permissions) {
    return capabilities;
  }

  if (permissions.canAccessDashboard) capabilities.push('Access Dashboard');
  if (permissions.canViewProjects) capabilities.push('View Projects');
  if (permissions.canCreateProjects) capabilities.push('Create Projects');
  if (permissions.canEditProjects) capabilities.push('Edit Projects');
  if (permissions.canDeleteProjects) capabilities.push('Delete Projects');
  if (permissions.canViewUsers) capabilities.push('View Users');
  if (permissions.canCreateUsers) capabilities.push('Create Users');
  if (permissions.canEditUsers) capabilities.push('Edit Users');
  if (permissions.canDeleteUsers) capabilities.push('Delete Users');
  if (permissions.canResetPasswords) capabilities.push('Reset Passwords');
  if (permissions.canViewAnalytics) capabilities.push('View Analytics');
  if (permissions.canAccessSettings) capabilities.push('Access Settings');
  if (permissions.canManageSystem) capabilities.push('Manage System');

  return capabilities;
}

// Check if role is admin level (Super Admin only)
export function isAdminLevel(role: UserRole | string | null | undefined): boolean {
  return role === 'Super Admin';
}

// Check if role has write access
export function hasWriteAccess(role: UserRole | string | null | undefined): boolean {
  if (!role) return false;
  return role === 'Super Admin' || role === 'Admin' || role === 'Editor';
}

// Check if role has delete access
export function hasDeleteAccess(role: UserRole | string | null | undefined): boolean {
  if (!role) return false;
  return role === 'Super Admin' || role === 'Admin';
}


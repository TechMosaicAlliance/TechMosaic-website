"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search, ArrowLeft, X, Edit, Trash2, Shield, User as UserIcon, UserX, UserCheck, Key, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const roles = ["Super Admin", "Admin", "Editor", "Viewer"];

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

function UsersPageContent() {
  const { user: currentUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [resetPasswordUserId, setResetPasswordUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    role: "Viewer",
    status: "Active",
    avatar: "",
  });

  // Check authentication
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch users
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('An error occurred while fetching users');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "All" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Admin":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Editor":
        return "bg-green-100 text-green-700 border-green-200";
      case "Viewer":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async () => {
    // Validation
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User created successfully!');
        setIsDrawerOpen(false);
        resetForm();
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('An error occurred while creating user');
    }
  };

  const handleUpdateUser = async () => {
    if (!formData.name || !formData.username || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const updateData: any = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        avatar: formData.avatar,
      };

      // Only include password if it's been changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`/api/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User updated successfully!');
    setIsDrawerOpen(false);
        setIsEditMode(false);
        resetForm();
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('An error occurred while updating user');
    }
  };

  const handleDeleteUser = async (userId: number, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User deleted successfully!');
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('An error occurred while deleting user');
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully!`);
        fetchUsers();
      } else {
        toast.error(data.error || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('An error occurred while updating user status');
    }
  };

  const handleEditUser = (user: User) => {
    setFormData({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
      avatar: user.avatar,
    });
    setIsEditMode(true);
    setIsDrawerOpen(true);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please enter both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`/api/users/${resetPasswordUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password reset successfully!');
        setIsPasswordResetOpen(false);
        setResetPasswordUserId(null);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('An error occurred while resetting password');
    }
  };

  const openPasswordResetModal = (userId: number) => {
    setResetPasswordUserId(userId);
    setNewPassword("");
    setConfirmPassword("");
    setIsPasswordResetOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      username: "",
      email: "",
      password: "",
      role: "Viewer",
      status: "Active",
      avatar: "",
    });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setIsEditMode(false);
    resetForm();
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-sm text-gray-600">Manage system users and permissions</p>
              </div>
            </div>

            <Button onClick={() => setIsDrawerOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
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
              placeholder="Search users by name, username, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Filter by Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="All">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Filter by Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">@{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
                          getRoleColor(user.role)
                        )}
                      >
                        {user.role === "Super Admin" && (
                          <Shield className="w-3 h-3 mr-1" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          getStatusColor(user.status)
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          title="Edit user"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openPasswordResetModal(user.id)}
                          title="Reset password"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                        {user.status === "Active" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleUserStatus(user)}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            title="Deactivate user"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleUserStatus(user)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            title="Activate user"
                          >
                            <UserCheck className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.username)}
                          title="Delete user"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No users found</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">
              {users.length}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.status === "Active").length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter((u) => u.role === "Admin" || u.role === "Super Admin").length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === "Editor").length}
            </div>
            <div className="text-sm text-gray-600">Editors</div>
          </div>
        </div>
      </main>

      {/* Drawer for New/Edit User */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={handleCloseDrawer}
          ></div>

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={handleCloseDrawer}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    placeholder="johndoe"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john.doe@techmosaic.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password {!isEditMode && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder={isEditMode ? "Leave blank to keep current password" : "••••••••"}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required={!isEditMode}
                />
                {isEditMode && (
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to keep the current password
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">
                  Select the appropriate role for this user
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Role Permissions Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  Role Permissions
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• <strong>Super Admin:</strong> Full system access</li>
                  <li>• <strong>Admin:</strong> Manage content and users</li>
                  <li>• <strong>Editor:</strong> Create and edit content</li>
                  <li>• <strong>Viewer:</strong> View-only access</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleCloseDrawer}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={isEditMode ? handleUpdateUser : handleCreateUser}
                  className="flex-1"
                >
                  {isEditMode ? 'Update User' : 'Create User'}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Password Reset Modal */}
      {isPasswordResetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity"
            onClick={() => setIsPasswordResetOpen(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
                </div>
                <button
                  onClick={() => setIsPasswordResetOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    The user will need to use this new password to log in. Make sure to communicate it securely.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordResetOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleResetPassword}
                  className="flex-1"
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Wrap with ProtectedRoute - Super Admin Only
export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={['Super Admin']}>
      <UsersPageContent />
    </ProtectedRoute>
  );
}

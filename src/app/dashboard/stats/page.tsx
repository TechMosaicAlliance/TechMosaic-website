"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Save, Plus, Trash2, BarChart3 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getPermissions, UserRole } from "@/lib/permissions";

interface Stat {
  id?: number;
  value: string;
  label: string;
  displayOrder?: number;
}

export default function StatsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error("Failed to load stats");
      }
      const data = await response.json();
      setStats(data.stats || []);
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load stats");
      // Set default stats if API fails
      setStats([
        { value: "72+", label: "Happy Clients" },
        { value: "128+", label: "Projects" },
        { value: "57+", label: "Team Members" },
        { value: "99%", label: "Satisfaction" },
      ]);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleAddStat = () => {
    setStats([...stats, { value: "", label: "" }]);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleStatChange = (index: number, field: "value" | "label", newValue: string) => {
    const updatedStats = [...stats];
    updatedStats[index] = { ...updatedStats[index], [field]: newValue };
    setStats(updatedStats);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Validate stats
      for (const stat of stats) {
        if (!stat.value.trim() || !stat.label.trim()) {
          toast.error("Please fill in all stat fields");
          setIsSaving(false);
          return;
        }
      }

      const response = await fetch("/api/stats", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({ stats }),
        cache: 'no-store'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save stats");
      }

      const result = await response.json();
      console.log("Save response:", result);
      
      toast.success("Stats saved successfully!");
      
      // Reload stats after a short delay to ensure DB is updated
      setTimeout(async () => {
        await loadStats();
      }, 500);
    } catch (error) {
      console.error("Error saving stats:", error);
      toast.error("Failed to save stats");
    } finally {
      setIsSaving(false);
    }
  };

  // Get user permissions
  const permissions = user ? getPermissions(user.role as UserRole) : null;

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check permissions
  if (!permissions?.canManageSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don&apos;t have permission to manage stats.</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-outfit">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Hero Stats Management</h1>
                  <p className="text-sm text-gray-600">Manage statistics displayed on the homepage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-8">
        {isLoadingStats ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddStat}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Stat
                </Button>
              </div>

              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleStatChange(index, "value", e.target.value)}
                          placeholder="e.g., 72+"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(index, "label", e.target.value)}
                          placeholder="e.g., Happy Clients"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveStat(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                {stats.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No stats added yet. Click &quot;Add Stat&quot; to get started.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Link href="/dashboard">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSaving || stats.length === 0}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Stats
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}


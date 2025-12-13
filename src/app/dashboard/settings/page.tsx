"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings, Save, Loader2, ArrowLeft, Code, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const ACCESS_PASSWORD = "4487";
const SESSION_KEY = "admin_access_granted";

export default function AdminSettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessPassword, setAccessPassword] = useState("");
  const [error, setError] = useState("");
  const [gtmId, setGtmId] = useState("");
  const [injectionMethod, setInjectionMethod] = useState<"nextjs" | "raw">("nextjs");
  const [tallyFormId, setTallyFormId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Check if access was already granted in this session
    const hasAccess = sessionStorage.getItem(SESSION_KEY) === "true";
    if (hasAccess) {
      setIsAuthenticated(true);
      loadSettings();
    }
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      // Load GTM ID
      const gtmResponse = await fetch("/api/settings?key=gtm_id");
      const gtmData = await gtmResponse.json();
      if (gtmData.setting && gtmData.setting.value) {
        setGtmId(gtmData.setting.value);
      }

      // Load injection method
      const methodResponse = await fetch("/api/settings?key=gtm_injection_method");
      const methodData = await methodResponse.json();
      if (methodData.setting && methodData.setting.value) {
        setInjectionMethod(methodData.setting.value as "nextjs" | "raw");
      }

      // Load Tally form ID
      const tallyResponse = await fetch("/api/settings?key=tally_form_id");
      const tallyData = await tallyResponse.json();
      if (tallyData.setting && tallyData.setting.value) {
        setTallyFormId(tallyData.setting.value);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (accessPassword === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, "true");
      loadSettings();
    } else {
      setError("Incorrect password. Please try again.");
      setAccessPassword("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Save GTM ID
      const gtmResponse = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "gtm_id",
          value: gtmId.trim(),
        }),
      });

      if (!gtmResponse.ok) {
        throw new Error("Failed to save GTM ID");
      }

      // Save injection method
      const methodResponse = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "gtm_injection_method",
          value: injectionMethod,
        }),
      });

      if (!methodResponse.ok) {
        throw new Error("Failed to save injection method");
      }

      // Save Tally form ID
      const tallyResponse = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "tally_form_id",
          value: tallyFormId.trim(),
        }),
      });

      if (!tallyResponse.ok) {
        throw new Error("Failed to save Tally form ID");
      }

      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  // Password Gate - Show this first
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Protected Area</h1>
              <p className="text-muted-foreground">
                This page is protected. Please enter the access password.
              </p>
            </div>

            {/* Access Password Form */}
            <form onSubmit={handleAccessSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="access-password"
                  className="text-sm font-medium text-foreground"
                >
                  Access Password
                </label>
                <input
                  id="access-password"
                  type="password"
                  value={accessPassword}
                  onChange={(e) => {
                    setAccessPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter access password"
                  required
                  autoFocus
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border",
                    error ? "border-destructive" : "border-input",
                    "bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "placeholder:text-muted-foreground",
                    "transition-all"
                  )}
                />
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                Access Settings
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Settings Page
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="mr-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure system settings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Google Tag Manager Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Google Tag Manager
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configure Google Tag Manager for tracking and analytics
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="gtm-id"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    GTM Container ID
                  </label>
                  <input
                    id="gtm-id"
                    type="text"
                    value={gtmId}
                    onChange={(e) => setGtmId(e.target.value)}
                    placeholder="GTM-MRR3M696"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-input",
                      "bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      "placeholder:text-muted-foreground",
                      "transition-all"
                    )}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter your Google Tag Manager Container ID (e.g., GTM-MRR3M696)
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="injection-method"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Injection Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        name="injection-method"
                        value="nextjs"
                        checked={injectionMethod === "nextjs"}
                        onChange={(e) => setInjectionMethod(e.target.value as "nextjs" | "raw")}
                        className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Next.js Script Component (Recommended)
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Uses Next.js optimized Script component for better performance and Next.js compatibility
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <input
                        type="radio"
                        name="injection-method"
                        value="raw"
                        checked={injectionMethod === "raw"}
                        onChange={(e) => setInjectionMethod(e.target.value as "nextjs" | "raw")}
                        className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Raw Script Tag (Exact HTML Format)
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Uses raw &lt;script&gt; tag matching Google&apos;s exact HTML format
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {gtmId && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Preview
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          The GTM scripts will be injected with ID: <code className="font-mono bg-green-100 dark:bg-green-900/50 px-1 rounded">{gtmId}</code>
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          Using: <span className="font-semibold">{injectionMethod === "nextjs" ? "Next.js Script Component" : "Raw Script Tag"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Tally Form Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Tally Form Integration
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configure the Tally form ID for the footer biodata form
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="tally-form-id"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tally Form ID
                  </label>
                  <input
                    id="tally-form-id"
                    type="text"
                    value={tallyFormId}
                    onChange={(e) => setTallyFormId(e.target.value)}
                    placeholder="your-form-id"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-input",
                      "bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      "placeholder:text-muted-foreground",
                      "transition-all"
                    )}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter your Tally form ID (e.g., if your form URL is https://tally.so/r/abc123, enter &quot;abc123&quot;)
                  </p>
                </div>

                {tallyFormId && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Preview
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          Form URL: <code className="font-mono bg-green-100 dark:bg-green-900/50 px-1 rounded">https://tally.so/r/{tallyFormId}</code>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                How it works
              </h3>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>Enter your Google Tag Manager Container ID above</li>
                <li>Choose between Next.js Script Component (recommended) or Raw Script Tag (exact HTML format)</li>
                <li>The GTM script will be automatically injected into the &lt;head&gt; section</li>
                <li>The noscript fallback will be added to the &lt;body&gt; section</li>
                <li>Changes take effect immediately after saving</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


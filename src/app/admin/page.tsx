"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock, Mail, Shield } from "lucide-react";

const ACCESS_PASSWORD = "4487";
const SESSION_KEY = "admin_access_granted";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessPassword, setAccessPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if access was already granted in this session
    const hasAccess = sessionStorage.getItem(SESSION_KEY) === "true";
    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (accessPassword === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    } else {
      setError("Incorrect password. Please try again.");
      setAccessPassword("");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just UI - no actual authentication logic
    console.log("Login attempt:", { email, password });
  };

  // Password Gate - Show this first
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary" />
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
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
                      "w-full pl-10 pr-4 py-3 rounded-lg border",
                      error ? "border-destructive" : "border-input",
                      "bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                      "placeholder:text-muted-foreground",
                      "transition-all"
                    )}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive mt-1">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                Access Admin Panel
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Login Form - Show this after password is verified
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 rounded-lg border border-input",
                    "bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "placeholder:text-muted-foreground",
                    "transition-all"
                  )}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={cn(
                    "w-full pl-10 pr-4 py-3 rounded-lg border border-input",
                    "bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "placeholder:text-muted-foreground",
                    "transition-all"
                  )}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a
                href="#"
                className="text-primary hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            <p>© 2024 TechMosaic. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


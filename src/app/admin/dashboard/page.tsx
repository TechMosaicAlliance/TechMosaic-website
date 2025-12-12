"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  FolderKanban,
  Users,
  Image,
  Mail,
  Layers,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {

  const managementCards = [
    {
      title: "Portfolio",
      description: "Showcase your best work",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Projects",
      description: "Manage client projects",
      icon: <FolderKanban className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Team",
      description: "Your amazing people",
      icon: <Users className="w-8 h-8" />,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Services",
      description: "What you offer",
      icon: <Layers className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Media",
      description: "Images and files",
      icon: <Image className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Messages",
      description: "Client inquiries",
      icon: <Mail className="w-8 h-8" />,
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              TechMosaic Admin
            </h1>

            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full">
          {/* Management Section */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              What would you like to manage?
            </h2>
            <p className="text-gray-500 text-lg">
              Choose a section below
            </p>
          </div>

          {/* Management Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementCards.map((card, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Gradient Background */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                    card.color
                  )}
                ></div>

                {/* Card Content */}
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-6">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                        card.color
                      )}
                    >
                      {card.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  Mail,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  Calendar,
  User,
  Building2,
  Phone,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getPermissions, UserRole } from "@/lib/permissions";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  projectDetails: string;
  source: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated, filter]);

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const url = filter === "unread" ? "/api/messages?unread=true" : "/api/messages";
      const response = await fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to load messages");
      }
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleMarkAsRead = async (messageId: number, isRead: boolean) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: !isRead }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      toast.success(isRead ? "Message marked as unread" : "Message marked as read");
      await loadMessages();
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, isRead: !isRead });
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async (messageId: number) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      toast.success("Message deleted successfully");
      await loadMessages();
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get user permissions
  const permissions = user ? getPermissions(user.role as UserRole) : null;

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-outfit">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check permissions - Super Admin only
  if (!permissions?.canViewUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-outfit">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-outfit">Access Denied</h1>
          <p className="text-gray-600 mb-4 font-outfit">Only Super Admin can view messages.</p>
          <Link href="/dashboard">
            <Button className="font-outfit">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 font-outfit">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="font-outfit">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-outfit">Messages</h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-outfit hidden sm:block">
                    Contact form submissions and inquiries
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 sm:px-3 py-1.5">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as "all" | "unread")}
                  className="bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-gray-700 cursor-pointer font-outfit"
                >
                  <option value="all">All Messages</option>
                  <option value="unread">Unread Only</option>
                </select>
              </div>
              {unreadCount > 0 && (
                <div className="bg-red-500 text-white rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold font-outfit">
                  {unreadCount} unread
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {isLoadingMessages ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-outfit">No messages</h3>
            <p className="text-sm sm:text-base text-gray-600 font-outfit">
              {filter === "unread"
                ? "You have no unread messages."
                : "No messages have been received yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-2 sm:space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={cn(
                    "bg-white rounded-xl border p-3 sm:p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedMessage?.id === message.id
                      ? "border-primary shadow-md ring-2 ring-primary/20"
                      : "border-gray-200",
                    !message.isRead && "border-l-4 border-l-primary"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base font-outfit truncate">
                        {message.fullName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate font-outfit">{message.email}</p>
                    </div>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5 ml-2" />
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 font-outfit">
                    {message.projectDetails}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-outfit">
                    <span className="truncate mr-2">{formatDate(message.createdAt)}</span>
                    <span className="capitalize flex-shrink-0">{message.source.replace("_", " ")}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-outfit">
                        {selectedMessage.fullName}
                      </h2>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 font-outfit">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          {formatDate(selectedMessage.createdAt)}
                        </span>
                        <span className="capitalize">
                          Source: {selectedMessage.source.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleMarkAsRead(selectedMessage.id, selectedMessage.isRead)
                        }
                        className="font-outfit text-xs sm:text-sm"
                      >
                        {selectedMessage.isRead ? (
                          <>
                            <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Mark Unread</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Mark Read</span>
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 font-outfit text-xs sm:text-sm"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 mb-1 font-outfit">Full Name</p>
                          <p className="font-medium text-gray-900 text-sm sm:text-base font-outfit break-words">
                            {selectedMessage.fullName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 mb-1 font-outfit">Email</p>
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="font-medium text-primary hover:underline text-sm sm:text-base font-outfit break-all"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>
                      </div>
                      {selectedMessage.phone && (
                        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 mb-1 font-outfit">Phone</p>
                            <a
                              href={`tel:${selectedMessage.phone}`}
                              className="font-medium text-primary hover:underline text-sm sm:text-base font-outfit"
                            >
                              {selectedMessage.phone}
                            </a>
                          </div>
                        </div>
                      )}
                      {selectedMessage.companyName && (
                        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 mb-1 font-outfit">Company</p>
                            <p className="font-medium text-gray-900 text-sm sm:text-base font-outfit break-words">
                              {selectedMessage.companyName}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-2 font-outfit">Project Details</p>
                          <p className="text-sm sm:text-base text-gray-900 whitespace-pre-wrap break-words font-outfit">
                            {selectedMessage.projectDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
                  <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-outfit">
                    Select a message
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-outfit">
                    Click on a message from the list to view its details.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


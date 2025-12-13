"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Faq from "../shared/Faq";
import { useAddContact } from "../hooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function ContactView() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    companyName: "",
    email: "",
    projectDetails: "",
    termsAccepted: false,
  });

  const { mutate, isPending } = useAddContact();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add any validation logic if needed
    if (formData.termsAccepted) {
      mutate({
        acf: {
          title: "New Enquiry",
          aboutproject: formData.projectDetails,
          companyname: formData.companyName,
          email: formData.email,
          fullname: formData.fullName,
          phone: formData.phoneNumber,
        },
      });
    } else {
      toast.error("Please accept the terms and conditions.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section - Compact */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#451842]/5 border border-[#451842]/10">
            <span className="text-xs font-semibold text-[#451842] tracking-wide uppercase">Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Let's Build Something <span className="text-[#451842]">Amazing Together</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Have a project in mind? Share your vision and let's make it a reality.
          </p>
        </div>
      </div>

      {/* Form and Info Section - Optimized Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          
          {/* Contact Form - Shows First on Mobile, Takes 3 columns on Desktop */}
          <div className="lg:col-span-3">
            <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-xl border border-gray-200 shadow-lg">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451842]/20 focus:border-[#451842] bg-white transition-all duration-200 placeholder:text-gray-400 text-gray-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                    <input
                      required
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451842]/20 focus:border-[#451842] bg-white transition-all duration-200 placeholder:text-gray-400 text-gray-900 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                    <input
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451842]/20 focus:border-[#451842] bg-white transition-all duration-200 placeholder:text-gray-400 text-gray-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451842]/20 focus:border-[#451842] bg-white transition-all duration-200 placeholder:text-gray-400 text-gray-900 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Details *</label>
                  <textarea
                    required
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={4}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#451842]/20 focus:border-[#451842] bg-white transition-all duration-200 placeholder:text-gray-400 text-gray-900 resize-none text-sm"
                  />
                </div>

                <div className="flex items-start space-x-2.5">
                  <input
                    id="terms"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#451842] focus:ring-2 focus:ring-[#451842]/20 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-gray-600 cursor-pointer leading-relaxed"
                  >
                    I agree to receive marketing and sales communication via email and phone.
                  </label>
                </div>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="bg-[#451842] hover:bg-[#5a1f55] text-white font-semibold w-full h-11 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information - Sidebar - Takes 2 columns on Desktop */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Contact Info</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Get in touch with us today.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Location */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xs font-bold text-[#451842] uppercase tracking-wide mb-2">Location</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Herbert Macaulay Street, Plot C36 Penthouse Estate, Lugbe East Extension, F.C.T, Nigeria
                </p>
              </div>

              {/* Contact Details */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xs font-bold text-[#451842] uppercase tracking-wide mb-2">Get In Touch</h3>
                <div className="space-y-1.5">
                  <a href="mailto:info@techmosaic.org" className="block text-xs sm:text-sm text-gray-700 hover:text-[#451842] transition-colors duration-200 break-all">
                    info@techmosaic.org
                  </a>
                  <a href="tel:+2348095555658" className="block text-xs sm:text-sm text-gray-700 hover:text-[#451842] transition-colors duration-200">
                    +234 809 555 5658
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xs font-bold text-[#451842] uppercase tracking-wide mb-2">Follow Us</h3>
                <div className="flex flex-col space-y-1.5">
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/company/techmosaic/"
                    className="text-xs sm:text-sm text-gray-700 hover:text-[#451842] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    LinkedIn
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/_techmosaic?igsh=ZDFjMGt6aTJ0bDI5"
                    className="text-xs sm:text-sm text-gray-700 hover:text-[#451842] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    Instagram
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  <Link
                    target="_blank"
                    href="https://youtube.com/@techmosaicalliance?si=v-GzRtmFjdQJ7gRL"
                    className="text-xs sm:text-sm text-gray-700 hover:text-[#451842] transition-colors duration-200 inline-flex items-center gap-1.5"
                  >
                    YouTube
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Faq />
        </div>
      </div>
    </div>
  );
}

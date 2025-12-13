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
    <div className="container mx-auto p-4 pt-[4rem] md:pt-[6rem] max-w-7xl">
      <div className="flex  gap-10 md:flex-row flex-col justify-between">
        <div className="flex  flex-col gap-4">
          <div className="grid gap-4">
            <p className="tracking-wider">LET&apos;S TALK</p>
            <h2 className="lg:text-6xl text-4xl lg:leading-[4rem] font-medium">
              You are one call
              <br />
              away{" "}
              <span className="playfair-display italic">from greatness</span>
            </h2>
          </div>
          <p className="text-lg text-[#606060] max-w-2xl">
            Tell us your project requirements, let&apos;s make magic together.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-14 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300"
              />
            </div>
            <div>
              <input
                required
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-14 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300"
              />
            </div>
            <div>
              <input
                required
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full h-14 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300"
              />
            </div>
            <div>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-14 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300"
              />
            </div>
            <div>
              <textarea
                required
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                placeholder="Tell us about your project"
                rows={4}
                className="w-full min-h-[120px] px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 resize-none"
              />
            </div>

            <div className="pt-6">
              <div className="flex items-start space-x-3 mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                />
                <div className="max-w-md">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-gray-600 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By clicking submit, you agree to receive marketing and
                    sales communication via email and call from us.
                  </label>
                </div>
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-semibold mt-4 w-full h-12 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={17} className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "SEND MESSAGE"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className=" gap-6 flex lg:gap-0 lg:flex-row pt-[9rem]">
        <div className="grid w-full mr-auto max-w-md gap-2 lg:gap-4 ">
          <h2 className="text-[#7A7979]">Location</h2>
          <p className="lg:text-xl text-lg font-medium">
            Herbert Macaulay Street, Plot C36 Penthouse Estate, Lugbe East
            Extension, F.C.T, Nigeria
          </p>
        </div>
        <div className="w-full max-w-md mx-auto grid">
          <h2 className="text-[#7A7979]">Call / Email</h2>
          <p className="lg:text-xl text-lg font-medium">info@techmosaic.org</p>
          <p className="lg:text-xl text-lg font-medium">+2348095555658</p>
        </div>
        <div className="grid max-w-md  ml-auto">
          <h2 className="text-[#7A7979]">Social media</h2>
          <Link
            target="_blank"
            href="https://www.linkedin.com/company/techmosaic/"
            className="lg:text-xl text-lg underline font-medium"
          >
            Linkedin
          </Link>
          <Link
            target="_blank"
            href="https://www.instagram.com/_techmosaic?igsh=ZDFjMGt6aTJ0bDI5"
            className="lg:text-xl text-lg underline font-medium"
          >
            Instagram
          </Link>
          <Link
            target="_blank"
            className="lg:text-xl text-lg underline font-medium"
            href="https://youtube.com/@techmosaicalliance?si=v-GzRtmFjdQJ7gRL"
          >
            Youtube
          </Link>
        </div>
      </div>

      <div className="mt-[10rem] bg-[#EEEDEB] p-6 md:p-16">
        <Faq />
      </div>
    </div>
  );
}

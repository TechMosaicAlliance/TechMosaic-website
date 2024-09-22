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

        <div className=" bg-white p-4 rounded-xl border max-w-lg">
          <form onSubmit={handleSubmit}>
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className=" h-[5rem] p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
            />
            <input
              required
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className=" h-[5rem] p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
            />
            <input
              required
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className=" h-[5rem] p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
            />
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className=" h-[5rem] p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
            />
            <textarea
              required
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              placeholder="Tell us about your project"
              className=" min-h-[5rem]  p-4 pt-10 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
            />

            <div className="pt-[3rem]">
              <div className="flex space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                <div className="max-w-md">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <p className="text-black/60">
                      By clicking submit, you agree to receive marketing and
                      sales communication via email and call from us.
                    </p>
                  </label>
                </div>
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-black mt-10 w-full text-xs"
              >
                {isPending ? (
                  <Loader2 size={17} className="animate-spin ml-1" />
                ) : (
                  "SEND MESSAGE"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className=" gap-6 lg:gap-0 lg:flex-row pt-[9rem]">
        <div className="grid gap-2 lg:gap-4 ">
          <h2 className="text-[#7A7979]">Location</h2>
          <p className="lg:text-xl text-lg font-medium">
            Herbert Macaulay Street, Plot C36 Penthouse Estate, Lugbe East
            Extension, F.C.T, Nigeria
          </p>
        </div>
        <div className="w-full grid">
          <h2 className="text-[#7A7979]">Call / Email</h2>
          <p className="lg:text-xl text-lg font-medium">info@techmosaic.org</p>
          <p className="lg:text-xl text-lg font-medium">+2348095555658</p>
        </div>
        <div className="grid">
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
        </div>
      </div> */}
      <div className="px-4 pt-[9rem]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 md:col-span-1">
            <h2 className="text-[#7A7979]">Location</h2>
            <p className="lg:text-xl text-lg font-medium">
              Herbert Macaulay Street, Plot C36 Penthouse Estate, Lugbe East
              Extension, F.C.T, Nigeria
            </p>
          </div>
          <div className="space-y-2 md:col-span-1">
            <h2 className="text-[#7A7979]">Call / Email</h2>
            <p className="lg:text-xl text-lg font-medium">
              info@techmosaic.org
            </p>
            <p className="lg:text-xl text-lg font-medium">+2348095555658</p>
          </div>
          <div className="space-y-2 md:col-span-1">
            <h2 className="text-[#7A7979]">Social media</h2>
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/techmosaic/"
              className="lg:text-xl text-lg underline font-medium block"
            >
              Linkedin
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/_techmosaic?igsh=ZDFjMGt6aTJ0bDI5"
              className="lg:text-xl text-lg underline font-medium block"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[10rem] bg-[#EEEDEB] p-6 md:p-16">
        <Faq />
      </div>
    </div>
  );
}

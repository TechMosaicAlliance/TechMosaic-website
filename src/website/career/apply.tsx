"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApplyJob } from "../hooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CareerAcf, IWordPressReturnTypeObj } from "@/services/wordpress/types";
import { transformUrl } from "@/lib/utils";

export function ApplyView({
  item,
}: {
  item: IWordPressReturnTypeObj<CareerAcf>;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    projectDetails: "",
    termsAccepted: false,
    about_you: "",
    why_do_you: "",
    cvFile: null as File | null, // Add file to formData
  });
  const [cvFileName, setCvFileName] = useState<string | null>(null); // To display file name

  const { mutate, isPending } = useApplyJob();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        cvFile: file, // Update cvFile in formData
      }));
      setCvFileName(file.name); // Update displayed file name
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("cvFileInput") as HTMLInputElement;
    fileInput?.click();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.termsAccepted) {
      const payload: {
        acf: {
          title: string;
          email: string;
          fullname: string;
          phone: string;
          about_you: string;
          why_do_you: string;
          job: string;
        };
        cvFile?: File; // Add cvFile here
      } = {
        acf: {
          title: "New Enquiry",
          email: formData.email,
          fullname: formData.fullName,
          phone: formData.phone,
          about_you: formData.about_you,
          why_do_you: formData.why_do_you,
          job: transformUrl(item.guid.rendered, item.id),
        },
      };
      
      // Add cvFile if it exists
      if (formData.cvFile) {
        payload.cvFile = formData.cvFile;
      }

      mutate(payload, {
        onSuccess() {
          setFormData({
            fullName: "",
            phone: "",
            email: "",
            projectDetails: "",
            termsAccepted: false,
            about_you: "",
            why_do_you: "",
            cvFile: null,
          });
          setCvFileName(null);
        },
      });
    } else {
      toast.error("Please accept the terms and conditions.");
    }
  };

  return (
    <div className="pt-[6rem]">
      <div className="">
        <h1 className="text-4xl font-medium">Apply Here</h1>
        <p>
          Please fill out the form below and we will contact you in 24 hours.
        </p>
      </div>
      <div className="pt-10">
        <form onSubmit={handleSubmit}>
          <input
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className=" h-[5rem] px-0 p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
          />
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className=" h-[5rem] px-0 p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
          />
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className=" h-[5rem] px-0 p-4 pb-5 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
          />
          <textarea
            required
            name="why_do_you"
            value={formData.why_do_you}
            onChange={handleChange}
            placeholder="Why do you want to work here"
            className="min-h-[5rem] px-0 p-4 pt-10 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
          />
          <textarea
            required
            name="about_you"
            value={formData.about_you}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="min-h-[5rem] px-0 p-4 pt-10 border-b focus:outline-none focus:border-black/30 bg-transparent outline-none w-full"
          />

          {/* File Upload Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Upload CV
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-black text-white text-sm rounded shadow hover:bg-slate-900 focus:outline-none"
              >
                Choose File
              </button>
              <span className="text-gray-500 text-sm">
                {cvFileName || "No file chosen"}
              </span>
            </div>
            <input
              id="cvFileInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="pt-[1rem]">
            <div className="flex space-x-2">
              <input
                id="terms"
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <p className="text-black/60">
                  By submitting this application, I agree that I have read the
                  Privacy Policy and confirm that Tech Mosaic can store my
                  personal details to be able to process my job application.
                </p>
              </label>
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="bg-black mt-4 text-xs"
            >
              {isPending ? (
                <Loader2 size={17} className="animate-spin ml-1" />
              ) : (
                "APPLY"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
"use client";
import { LogoSvg } from "@/components/svgs";
import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAddContact, useAddNewsletter } from "../hooks";
import { usePathname } from "next/navigation";

type IFooter = {
  type: "newsletter" | "contact";
};

const path = ["/blogs", "/portfolio"];

export default function Footer(props: IFooter) {
  const pathname = usePathname();
  return (
    <footer className="pt-14">
      {path.includes(pathname) ? <NewsLetterFooter /> : <ContactUsFooter />}
      <section className="bg-primary text-primary-foreground">
        <FooterLinks />
        <section className="border-t border-primary-foreground/10">
          <div className="container max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm text-primary-foreground/70 font-medium">
                &copy; {new Date().getFullYear()} TechMosaic. All Rights Reserved.
              </p>
              <ul className="flex items-center gap-6 text-sm font-medium">
                <li>
                  <Link 
                    href="/terms" 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms" 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
    </footer>
  );
}
function FooterLinks() {
  return (
    <section className="container max-w-7xl mx-auto px-4 lg:px-6 pt-16 lg:pt-20 pb-12 lg:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Logo and Company Links */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <LogoSvg className="w-[12rem] lg:w-[14rem]" />
          </div>
          <p className="text-sm text-primary-foreground/70 font-normal leading-relaxed max-w-sm">
            Building innovative digital solutions that drive growth and transform businesses.
          </p>
          <ul className="grid gap-3 pt-2">
            <li>
              <Link 
                href="/portfolio" 
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                href="/about-us" 
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                href="/career" 
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
              >
                Join Our Team
              </Link>
            </li>
            <li>
              <Link 
                href="/casestudy" 
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
              >
                Case Study
              </Link>
            </li>
            <li>
              <Link 
                href="/services#testimonial" 
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm font-normal text-primary-foreground/80 leading-relaxed">
              <li className="leading-relaxed">
                Herbert Macaulay Street,
                <br /> Plot C36 Penthouse Estate,
                <br /> Lugbe East Extension, F.C.T, Nigeria
              </li>
              <li>
                <a 
                  href="mailto:info@techmosaic.org" 
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  info@techmosaic.org
                </a>
              </li>
              <li>
                <a 
                  href="tel:+2348095555658" 
                  className="hover:text-primary-foreground transition-colors duration-200"
                >
                  +234 809 555 5658
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Resources */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/blogs" 
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/techmosaic/"
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/_techmosaic?igsh=ZDFjMGt6aTJ0bDI5"
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtube.com/@techmosaicalliance?si=v-GzRtmFjdQJ7gRL"
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm font-normal text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 inline-block"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsLetterFooter() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { mutate, isPending } = useAddNewsletter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutate({
      acf: {
        email: formData.email,
      },
    });
  };
  return (
    <div className="relative w-full pb-16 lg:pb-20 flex overflow-hidden">
      <Image
        alt="Newsletter subscription"
        src="/assets/footer.jpg"
        fill
        className="object-cover absolute"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between container max-w-7xl mx-auto px-4 lg:px-6 pt-16 lg:pt-20 z-10">
        <div className="flex-1 max-w-2xl">
          <div className="space-y-4 text-white">
            <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
              Subscribe To Our
              <br /> Newsletter{" "}
              <span className="playfair-display italic"> & Join 2K+</span>
              <br />
              <span className="playfair-display italic">
                Community of Superstars
              </span>
            </h2>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed">
              Stay updated with the latest insights, tips, and industry news delivered straight to your inbox.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[420px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="newsletter-email" className="text-white text-sm font-medium block">
                Email Address
              </label>
              <div className="flex items-center relative group">
                <input
                  id="newsletter-email"
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@domain.com"
                  className="w-full px-5 py-4 pr-14 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all duration-200 text-white placeholder-white/50"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="absolute right-2 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Subscribe to newsletter"
                >
                  {isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactUsFooter() {
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
    <div className="relative w-full pb-16 lg:pb-20 flex overflow-hidden">
      <Image
        alt="Contact us"
        src="/assets/footer.jpg"
        fill
        className="object-cover absolute"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between container max-w-7xl mx-auto px-4 lg:px-6 pt-16 lg:pt-20 z-10">
        <div className="flex-1 max-w-2xl pt-8 lg:pt-12">
          <div className="space-y-6 text-white">
            <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
              Ready To Grow Your
              <br /> Company?{" "}
              <span className="playfair-display italic">Book A Call</span>
              <br />
              <span className="playfair-display italic">With Us!</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
              Get custom design and tech solutions to grow your business and stay
              ahead of the competition
            </p>
            <Link href="/contact">
              <Button className="border-white border bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all duration-200">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[480px]">
          <div className="rounded-2xl backdrop-blur-md bg-white/10 p-8 lg:p-10 shadow-xl border border-white/20">
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white">Contact Us</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Please fill out the form below and we will reach out to you within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all duration-200 text-white placeholder-white/50"
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
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all duration-200 text-white placeholder-white/50"
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
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white focus:ring-2 focus:ring-white/20 outline-none transition-all duration-200 text-white placeholder-white/50 resize-none"
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-white focus:ring-2 focus:ring-white/20"
                  />
                  <label htmlFor="terms" className="text-xs text-white/80 leading-relaxed">
                    By clicking submit, you agree to receive marketing and sales
                    communication via email and call from us.
                  </label>
                </div>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full text-white bg-white hover:bg-white/90 text-black font-medium py-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Submit Now"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

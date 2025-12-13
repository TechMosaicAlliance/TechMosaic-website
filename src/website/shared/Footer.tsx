"use client";
import { LogoSvg } from "@/components/svgs";
import { Button, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowRight, Loader2, Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";
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
    <footer className="pt-14 relative">
      {path.includes(pathname) ? <NewsLetterFooter /> : <ContactUsFooter />}
      <section className="relative bg-primary text-primary-foreground overflow-hidden rounded-2xl m-4">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <FooterLinks />
        <section className="relative border-t border-primary-foreground/10 bg-primary/50 backdrop-blur-sm">
          <div className="container max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-primary-foreground/80 font-medium">
                  &copy; {new Date().getFullYear()} TechMosaic. All Rights Reserved.
                </p>
                <p className="text-xs text-primary-foreground/60">
                  Building the future, one pixel at a time.
                </p>
              </div>
              <ul className="flex items-center gap-8 text-sm font-medium">
                <li>
                  <Link
                    href="/terms"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 hover:underline underline-offset-4"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 hover:underline underline-offset-4"
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
    <section className="relative container max-w-7xl mx-auto px-4 lg:px-6 pt-20 lg:pt-24 pb-16 lg:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Logo and Company Links */}
        <div className="lg:col-span-4 space-y-6">
          <div className="transform transition-transform duration-300 hover:scale-105">
            <LogoSvg className="w-[12rem] lg:w-[14rem] drop-shadow-lg" />
          </div>
          <p className="text-sm text-primary-foreground/80 font-normal leading-relaxed max-w-sm">
            Building innovative digital solutions that drive growth and transform businesses.
          </p>
          <div className="pt-4">
            <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-foreground/50 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-2.5">
              <li>
                <Link
                  href="/portfolio"
                  className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1"
                >
                  <span>Portfolio</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1"
                >
                  <span>Join Our Team</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/casestudy"
                  className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services#testimonial"
                  className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1"
                >
                  <span>Testimonials</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://tally.so/r/your-form-id"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-1.5 hover:translate-x-1 bg-primary-foreground/5 hover:bg-primary-foreground/10 px-4 py-2 rounded-lg border border-primary-foreground/10 hover:border-primary-foreground/20"
              >
                <span>Fill Basic Biodata</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-foreground/50 rounded-full"></div>
              Contact
            </h3>
            <ul className="space-y-4 text-sm font-normal text-primary-foreground/80 leading-relaxed">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300 flex-shrink-0" />
                <span className="leading-relaxed">
                  {/* Updated address - Please provide the new address */}
                  [New Address Here]
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300" />
                <a
                  href="mailto:info@techmosaic.org"
                  className="hover:text-primary-foreground transition-all duration-300 hover:underline underline-offset-4"
                >
                  info@techmosaic.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300" />
                <a
                  href="tel:+2348095555658"
                  className="hover:text-primary-foreground transition-all duration-300 hover:underline underline-offset-4"
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
            <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-foreground/50 rounded-full"></div>
              Resources
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/blogs"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2 hover:translate-x-1"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 group-hover:bg-primary-foreground transition-colors duration-300"></div>
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2 hover:translate-x-1"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 group-hover:bg-primary-foreground transition-colors duration-300"></div>
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-foreground/50 rounded-full"></div>
              Follow Us
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/techmosaic/"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-3 hover:translate-x-1"
                >
                  <Linkedin className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300" />
                  <span>LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/_techmosaic?igsh=ZDFjMGt6aTJ0bDI5"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-3 hover:translate-x-1"
                >
                  <Instagram className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300" />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtube.com/@techmosaicalliance?si=v-GzRtmFjdQJ7gRL"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-3 hover:translate-x-1"
                >
                  <Youtube className="w-4 h-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-300" />
                  <span>YouTube</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-foreground/50 rounded-full"></div>
              Legal
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/terms"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2 hover:translate-x-1"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 group-hover:bg-primary-foreground transition-colors duration-300"></div>
                  <span>Terms</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="group text-sm font-normal text-primary-foreground/75 hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2 hover:translate-x-1"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40 group-hover:bg-primary-foreground transition-colors duration-300"></div>
                  <span>Privacy</span>
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
    <div className="relative w-full pb-20 lg:pb-24 flex overflow-hidden rounded-2xl m-4">
      <Image
        alt="Newsletter subscription"
        src="/assets/footer.jpg"
        fill
        className="object-cover absolute scale-105 transition-transform duration-700 hover:scale-100 rounded-2xl"
      />
      <div className="absolute inset-0 bg-black/60 rounded-2xl" />

      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between container max-w-7xl mx-auto px-4 lg:px-6 pt-20 lg:pt-24 z-10">
        <div className="flex-1 max-w-2xl">
          <div className="space-y-5 text-white">
            <div className="inline-block">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                Newsletter
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Subscribe To Our
              <br /> Newsletter{" "}
              <span className="playfair-display italic text-white/90"> & Join 2K+</span>
              <br />
              <span className="playfair-display italic text-white/90">
                Community of Superstars
              </span>
            </h2>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-lg">
              Stay updated with the latest insights, tips, and industry news delivered straight to your inbox.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[440px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <label htmlFor="newsletter-email" className="text-white text-sm font-semibold block">
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
                  className="w-full px-5 py-4 pr-16 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all duration-300 text-white placeholder-white/50 shadow-lg hover:bg-white/15"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="absolute right-2 p-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Subscribe to newsletter"
                >
                  {isPending ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </button>
              </div>
              <p className="text-xs text-white/60">
                We respect your privacy. Unsubscribe at any time.
              </p>
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
    <div className="relative pb-20 lg:pb-24 flex overflow-hidden rounded-2xl m-4">
      <Image
        alt="Contact us"
        src="/assets/footer.jpg"
        fill
        className="object-cover absolute scale-105 transition-transform duration-700 hover:scale-100 rounded-2xl"
      />
      <div className="absolute inset-0 bg-black/60 rounded-2xl" />

      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-between container max-w-7xl mx-auto px-4 lg:px-6 pt-20 lg:pt-24 z-10">
        <div className="flex-1 max-w-2xl pt-8 lg:pt-12">
          <div className="space-y-6 text-white">
            <div className="inline-block">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
              Ready To Grow Your
              <br /> Company?{" "}
              <span className="playfair-display italic text-white/90">Book A Call</span>
              <br />
              <span className="playfair-display italic text-white/90">With Us!</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl">
              Get custom design and tech solutions to grow your business and stay
              ahead of the competition
            </p>
            <Link href="/contact">
              <Button className="group border-white/30 border bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 hover:border-white/50 hover:shadow-lg hover:scale-105 active:scale-95 px-6 py-6">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:min-w-[500px]">
          <div className="rounded-2xl backdrop-blur-md bg-white/10 p-8 lg:p-10 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
            <div className="space-y-2 mb-8">
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
                  className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 shadow-sm"
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
                  className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all duration-300 text-white placeholder-white/50 hover:bg-white/15 shadow-sm"
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
                  className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl focus:border-white focus:ring-2 focus:ring-white/30 outline-none transition-all duration-300 text-white placeholder-white/50 resize-none hover:bg-white/15 shadow-sm"
                />
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-white focus:ring-2 focus:ring-white/30 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-white/80 leading-relaxed cursor-pointer">
                    By clicking submit, you agree to receive marketing and sales
                    communication via email and call from us.
                  </label>
                </div>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full text-white bg-primary hover:bg-primary/90 font-semibold py-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
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

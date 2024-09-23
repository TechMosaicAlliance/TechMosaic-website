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
      <section className="bg-primary pt-[7rem] text-primary-foreground ">
        <FooterLinks />
        <section className="items-center p-3  gap-2 lg:gap-0 flex-wrap lg:flex-nowrap lg:max-w-7xl mx-auto py-5 mt-6 flex justify-between bg-primary border-t border-accent/20">
          <p className="text-accent">
            &copy; TechMosaic {new Date().getFullYear()} . All Rights Reserved.
          </p>
          <ul className=" font-medium flex items-center text-sm gap-3 ">
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/terms">Licenses</Link>
            </li>
          </ul>
        </section>
      </section>
    </footer>
  );
}
function FooterLinks() {
  return (
    <section className="flex gap-4 p-4 lg:gap-0 flex-col lg:flex-row container max-w-7xl mx-auto justify-between">
      <div className="grid gap-4">
        <div className="-mt-2">
          <LogoSvg className="w-[12rem]" />
        </div>
        <div className="lg:pl-4">
          <ul className=" font-medium text-sm grid gap-3 pt-4">
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            {/* <li>
              <Link href="/pricing">Pricing</Link>
            </li> */}
            <li>
              <Link href="/career">Join Our Team</Link>
            </li>
            <li>
              <Link href="/casestudy">Case Study</Link>
            </li>
            <li>
              <Link href="/services#testimonial">Testimonials</Link>
            </li>
            {/* <li>
              <Link href="/">How we give feedback</Link>
            </li> */}
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-[5rem]  ">
        <div>
          <h1 className=" font-semibold text-sm">Address</h1>
          <ul className=" font-medium text-sm grid gap-3 pt-4">
            <li>
              Herbert Macaulay Street,
              <br /> Plot C36 Penthouse Estate,
              <br /> Lugbe East Extension, F.C.T, Nigeria
            </li>
            <li>info@techmosaic.org</li>
            <li>+2348095555658</li>
          </ul>
        </div>
        <div>
          <h1 className=" font-semibold text-sm">Resources</h1>
          <ul className=" font-medium text-sm grid gap-3 pt-4">
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            {/* <li>
              <Link target="_blank" href="/contact">
                Help center
              </Link>
            </li> */}
            <li>
              <Link target="_blank" href="/contact">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className=" font-semibold text-sm">Socials</h1>
          <ul className=" font-medium text-sm grid gap-3 pt-4">
            {/* <li>
              <Link target="_blank" href="#">
                Twitter
              </Link>
            </li> */}
            <li>
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/techmosaic/"
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://www.instagram.com/_techmosaic?igsh=ZDFjMGt6aTJ0bDI5"
              >
                Instagram
              </Link>
            </li>

            <li>
              <Link
                target="_blank"
                href="https://youtube.com/@techmosaicalliance?si=v-GzRtmFjdQJ7gRL"
              >
                Youtube
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className=" font-semibold text-sm">Legal</h1>
          <ul className=" font-medium text-sm grid gap-3 pt-4">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/terms">Privacy</Link>
            </li>
            {/* <li>Cookies</li> */}
          </ul>
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
    <div className="relative w-full pb-20 flex ">
      <Image
        alt=""
        src="/assets/footer.jpg"
        fill
        className="object-cover absolute "
      />
      <div className="relative flex flex-col max-w-7xl items-center lg:flex-row gap-10 justify-between container lg:pt-[5.5rem] mx-auto z-20 ">
        <div className="grid  h-fit gap-4">
          <div className="grid gap-4 text-white">
            <h2 className="lg:text-5xl text-4xl lg:leading-[4rem] font-medium">
              Subscribe To Our
              <br /> Newsletter{" "}
              <span className="playfair-display italic"> & Join 2K+</span>
              <br />
              <span className="playfair-display italic">
                Community of Superstars
              </span>
            </h2>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3">
              <label className="text-white text-lg">Email</label>
              <div className="flex items-center relative">
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@domain.com"
                  className="p-4 border-b focus:border-white bg-transparent outline-none w-full text-white placeholder-white/60 backdrop-blur-md  shadow-lg border border-white/40"
                />
                <button
                  disabled={isPending}
                  className="absolute right-5 text-white"
                >
                  {isPending ? (
                    <Loader2 size={17} className="animate-spin mr-2" />
                  ) : (
                    <ArrowRight />
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
    <div className="relative w-full pb-20 flex ">
      <Image
        alt=""
        src="/assets/footer.jpg"
        fill
        className="object-cover absolute "
      />
      <div className="relative flex flex-col lg:flex-row gap-10 justify-center p-4 lg:container lg:pt-[5.5rem] mx-auto z-20 ">
        <div className="grid pt-[4rem] md:pt-[6rem] h-fit gap-4">
          <div className="grid gap-4 text-white">
            <h2 className="lg:text-5xl text-3xl lg:leading-[4rem] font-medium">
              Ready To Grow Your
              <br /> Company?{" "}
              <span className="playfair-display italic">Book A Call</span>
              <br />
              <span className="playfair-display italic">With Us!</span>
            </h2>
          </div>
          <p className="lg:text-xl text-lg text-white max-w-2xl">
            Get custom design and tech solutions to grow your business and stay
            ahead of the competition
          </p>
          <Button className="w-fit border-white border rounded-none bg-transparent text-white ">
            <Link href="/contact">SHOW MORE</Link>
          </Button>
        </div>

        <div className="w-full max-w-lg rounded-xl backdrop-blur-md bg-white/10 p-8 shadow-lg border border-white/20">
          <div className="grid gap-2 pb-3">
            <h1 className="text-3xl font-medium text-white">Contact Us</h1>
            <p className="text-white/80">
              Please fill out the form below and we will reach out to you in 24
              hours.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-4 px-0 border-b border-white/30 focus:border-white bg-transparent outline-none w-full text-white placeholder-white/60"
            />
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="p-4 px-0 border-b border-white/30 focus:border-white bg-transparent outline-none w-full text-white placeholder-white/60"
            />
            <textarea
              required
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              placeholder="Tell us about your project"
              className="p-4 px-0 border-b border-white/30 focus:border-white bg-transparent outline-none w-full text-white placeholder-white/60 min-h-[2rem]"
            />

            <div className="pt-4">
              <div className="flex space-x-2 items-start">
                <input
                  id="terms"
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-white/80">
                  By clicking submit, you agree to receive marketing and sales
                  communication via email and call from us.
                </label>
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className=" text-black w-fit bg-white hover:bg-white/90 mt-6"
              >
                {isPending ? (
                  <Loader2 size={17} className="animate-spin mr-2" />
                ) : null}
                {isPending ? "SENDING..." : "SUBMIT NOW"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

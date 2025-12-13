"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import { ArrowRightSvg } from "@/components/svgs";
import { useHeroAnimation } from "../animations";
import { useRouter } from "next/navigation";

const data = [
  {
    name: "Graphic Design",
    text: "Creative designs that tell your story. elevate your brand image and drive growth",
    image: "/services/pexels-polina-zimmerman-3747266.jpg",
    gradient: "from-purple-500/20 via-pink-500/20 to-orange-500/20",
    number: "01",
  },
  {
    name: "Copywriting",
    text: "Craft compelling copy that resonates with your audience and inspires action.",
    image: "/services/emily-bernal-BM3U_D2lygo-unsplash.jpg",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    number: "02",
  },
  {
    name: "UI/UX Design",
    text: "Design user-friendly interfaces that offer an engaging and intuitive experience.",
    image: "/services/alvaro-reyes-zvmZiw3vdsQ-unsplash (1).jpg",
    gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
    number: "03",
  },
  {
    name: "Web Development",
    text: "Develop robust websites that are fast, secure, and tailored to your business needs.",
    image: "/services/daniel-korpai-pKRNxEguRgM-unsplash.jpg",
    gradient: "from-emerald-500/20 via-green-500/20 to-lime-500/20",
    number: "04",
  },
  {
    name: "Brand Design",
    text: "Build a strong and recognizable brand that stands out in the competitive market.",
    image: "/services/balazs-ketyi-LPWl2pEVGKc-unsplash.jpg",
    gradient: "from-amber-500/20 via-yellow-500/20 to-orange-500/20",
    number: "05",
  },
  {
    name: "Project Management",
    text: "Streamline your projects with expert management that ensures timely delivery and quality results.",
    image: "/services/pexels-polina-zimmerman-3747266.jpg",
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    number: "06",
  },
];

// Map service names to project serviceType values
const mapServiceToServiceType = (serviceName: string): string => {
  const mapping: Record<string, string> = {
    "Graphic Design": "Graphic Design",
    "Copywriting": "Copywriting",
    "UI/UX Design": "UI/UX Design",
    "Web Development": "Web Development",
    "Brand Design": "Branding & Identity",
    "Project Management": "Project Management",
  };
  return mapping[serviceName] || serviceName;
};

export default function OurService() {
  const router = useRouter();
  const [open, setOpen] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (serviceName: string) => {
    const serviceType = mapServiceToServiceType(serviceName);
    router.push(`/project-management?serviceType=${encodeURIComponent(serviceType)}`);
  };

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.opacity = "0";
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.opacity = "1";
        }
      }, 50);
    }
  }, [open]);

  // Update image when accordion item is clicked
  useEffect(() => {
    if (imageRef.current && data[open]) {
      // Trigger image change animation
      imageRef.current.style.transform = "scale(0.95)";
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = "scale(1)";
        }
      }, 200);
    }
  }, [open, data]);

  return (
    <section className="relative container max-w-7xl px-4 py-16 lg:py-24 lg:px-6 overflow-hidden">
      {/* Subtle background decoration with brand color */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="relative z-10">
        {/* Header Section */}
        <div 
          data-animation="trigger-fade-in-y"
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16"
        >
          <div className="space-y-4">
            {/* Eyebrow with accent */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-primary rounded-full" />
              <h3 className="tracking-[0.15em] font-semibold text-xs lg:text-sm uppercase text-primary">
                WHAT WE DO
              </h3>
            </div>

            {/* Main heading - Bolder and Bigger */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-neutral-900 playfair-display">
              Our Service
              <br className="hidden lg:block" />
              <span className="text-primary">Reliable and affordable</span>
              <br className="hidden lg:block" /> custom solutions that work
            </h1>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/services"
              className={cn(
                buttonVariants({
                  className: "group border-2 border-primary/30 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md font-semibold px-6 py-6",
                  variant: "default",
                })
              )}
            >
              EXPLORE WHAT WE DO
              <ArrowRightSvg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div 
          data-animation="trigger-fade-in-y"
          className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 xl:gap-12"
        >
          {/* Services List - Left Side */}
          <div className="w-full lg:w-[48%] xl:w-[50%] h-[32rem] lg:h-[42rem] xl:h-[46rem] flex flex-col space-y-3 overflow-hidden">
            {data.map((item, idx) => (
              <div
                onClick={() => {
                  setOpen(idx);
                  handleServiceClick(item.name);
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                key={idx}
                className={cn(
                  "relative group cursor-pointer transition-all duration-300 ease-out",
                  "rounded-xl border overflow-hidden",
                  open === idx
                    ? "bg-white shadow-lg border-primary/40"
                    : "bg-white/80 backdrop-blur-sm border-neutral-200/50 hover:border-primary/30 hover:shadow-md"
                )}
              >
                {/* Active indicator */}
                {open === idx && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}

                <div className="relative flex items-center p-5 lg:p-6 gap-4">
                  {/* Number badge */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-base transition-all duration-300",
                    open === idx
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-500 group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    {item.number}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className={cn(
                        "text-lg lg:text-xl font-semibold transition-colors duration-300",
                        open === idx
                          ? "text-primary"
                          : "text-neutral-900 group-hover:text-primary"
                      )}>
                        {item.name}
                      </h2>
                      <div className={cn(
                        "flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300",
                        open === idx
                          ? "border-primary bg-primary"
                          : "border-neutral-300 group-hover:border-primary group-hover:bg-primary/10"
                      )}>
                        {open === idx ? (
                          <Minus className="text-white" size={14} strokeWidth={3} />
                        ) : (
                          <Plus className="text-neutral-400 group-hover:text-primary" size={14} strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                    <div className={cn(
                      "overflow-hidden transition-all duration-500 ease-in-out",
                      open === idx ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <p className="text-neutral-600 text-xs font-normal leading-relaxed pt-1">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Explore Our Service Button Below Brand Design */}
            {data.findIndex((item) => item.name === "Brand Design") !== -1 && (
              <div className="mt-4 pt-4 border-t border-neutral-200/50">
                <Link
                  href="/services"
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-semibold text-sm bg-primary/10 hover:bg-primary text-primary hover:text-white border-2 border-primary/30 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
                  )}
                >
                  <span>Explore Our Service</span>
                  <ArrowRightSvg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>

          {/* Image Display - Right Side */}
          <div
            ref={imageRef}
            onClick={() => handleServiceClick(data[open]?.name)}
            className="opacity-0 lg:flex h-[32rem] lg:h-[42rem] xl:h-[46rem] w-full lg:w-[48%] xl:w-[50%] relative overflow-hidden rounded-2xl border-2 border-neutral-200/60 bg-background shadow-xl group/image-container transition-opacity duration-500 flex-shrink-0 cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Overlay with brand color */}
            <div className="absolute inset-0 bg-primary/40 z-10 transition-all duration-700" />

            <BlurImage
              key={data[open]?.image}
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                isHovering ? "scale-105" : "scale-100"
              )}
              src={data[open]?.image || "/services/alvaro-reyes-zvmZiw3vdsQ-unsplash.jpg"}
              alt={data[open]?.name || "What We Do"}
              fill
            />

            {/* Content overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:p-10">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 lg:p-8 border border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/30 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{data[open]?.number}</span>
                    </div>
                    <div className="h-px flex-1 bg-white/40" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                    {data[open]?.name}
                  </h3>
                  <p className="text-white/95 text-sm lg:text-base font-light leading-relaxed max-w-md">
                    {data[open]?.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

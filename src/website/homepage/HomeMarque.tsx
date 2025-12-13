/* eslint-disable @next/next/no-img-element */
"use client";
import { companyMarqueeData } from "@/services/dummyData";
import React from "react";
import Marquee from "./Marquee";
import { useGetLogos } from "../hooks";
import { cn } from "@/lib/utils";
import { wordPressBaseUrl } from "@/services/constants";

// Helper function to normalize logo URLs
function normalizeLogoUrl(url: string | undefined | null): string | null {
  if (!url) return null;

  // If it's already an absolute URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, prepend the WordPress base URL
  if (wordPressBaseUrl) {
    // Remove trailing slash from base URL if present
    const baseUrl = wordPressBaseUrl.replace(/\/$/, "");
    // Ensure the path starts with a slash
    const path = url.startsWith("/") ? url : `/${url}`;
    return `${baseUrl}${path}`;
  }

  return url;
}

export default function HomeMarque() {
  const { data, isPending } = useGetLogos();

  if (isPending) {
    return (
      <div className="py-12 lg:py-16 flex items-center justify-center">
        <div className="flex gap-8 items-center opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-32 h-12 bg-neutral-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Filter out items without valid logos and normalize URLs
  const validLogos = data?.filter((item) => {
    const logoUrl = normalizeLogoUrl(item.acf?.logo);
    return logoUrl && logoUrl.trim() !== "";
  }) || [];


  if (validLogos.length > 4) {
    return (
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        {/* Subtle background decoration with brand color */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 mb-12 lg:mb-16">
          {/* Enhanced Header */}
          <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-primary rounded-full" />
              <p className="text-center text-xs lg:text-sm font-semibold tracking-[0.15em] text-primary uppercase">
                Trusted by leading companies
              </p>
              <div className="w-12 h-[2px] bg-primary rounded-full" />
            </div>
          </div>
        </div>

        <Marquee speed={50}>
          <div
            className="flex items-center gap-8 lg:gap-12 px-4"
          >
            {validLogos.map((item, idx) => {
              const logoUrl = normalizeLogoUrl(item.acf?.logo);
              if (!logoUrl) return null;

              return (
                <div
                  key={item.id || idx}
                  className="group relative"
                >
                  {/* Card container with enhanced styling - Increased height */}
                  <div className="relative flex items-center justify-center px-8 py-8 lg:py-10 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-neutral-200/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-500 min-h-[80px] lg:min-h-[100px]">
                    {/* Logo - Increased height */}
                    <div
                      className={cn(
                        "w-auto h-16 lg:h-20",
                        "opacity-50 grayscale contrast-75 transition-all duration-700 ease-out",
                        "group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110"
                      )}
                      style={{
                        minWidth: '120px',
                        maxWidth: '220px',
                        backgroundImage: `url(${logoUrl})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        position: 'relative',
                        zIndex: 10
                      }}
                      role="img"
                      aria-label={item.title?.rendered || `Company logo ${idx + 1}`}
                    />

                    {/* Subtle glow effect on hover with brand color */}
                    <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-700 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </Marquee>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-20 bg-white">
      <Marquee>
        <div
          className="flex items-center gap-12 lg:gap-16 px-4"
          data-animation="trigger-fade-in-y"
        >
          {companyMarqueeData.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center h-16 lg:h-20 px-6 lg:px-8 group"
            >
              <div className="relative w-auto max-w-[200px] lg:max-w-[240px] h-full flex items-center justify-center">
                <div className="opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}

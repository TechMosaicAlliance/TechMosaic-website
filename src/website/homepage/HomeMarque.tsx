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
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(209,213,219,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(209,213,219,0.15),transparent_50%)]" />

        <div className="container mx-auto px-4 mb-8">
          <p className="text-center text-sm font-medium tracking-wider text-neutral-500 uppercase">
            Trusted by leading companies
          </p>
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
                  {/* Card container with subtle styling */}
                  <div className="relative flex items-center justify-center px-8 py-6 rounded-xl bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-sm hover:shadow-md transition-all duration-500 hover:border-neutral-300/80">
                    {/* Logo */}
                    <div
                      className={cn(
                        "w-auto h-12 lg:h-14",
                        "opacity-50 grayscale contrast-75 transition-all duration-700 ease-out",
                        "group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110"
                      )}
                      style={{
                        minWidth: '100px',
                        maxWidth: '180px',
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

                    {/* Subtle glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-orange-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5 transition-all duration-700 pointer-events-none" />
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
    <section className="py-12 lg:py-20 bg-gradient-to-b from-white via-neutral-50/30 to-white">
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

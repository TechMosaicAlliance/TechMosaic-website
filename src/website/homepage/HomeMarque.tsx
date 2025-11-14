/* eslint-disable @next/next/no-img-element */
"use client";
import { companyMarqueeData } from "@/services/dummyData";
import React from "react";
import Marquee from "./Marquee";
import { useGetLogos } from "../hooks";
import { cn } from "@/lib/utils";

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

  if (data && data?.length > 4) {
    return (
      <section className="py-12 lg:py-20 bg-gradient-to-b from-white via-neutral-50/30 to-white">
        <Marquee>
          <div 
            className="flex items-center gap-12 lg:gap-16 px-4" 
            data-animation="trigger-fade-in-y"
          >
            {data.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center h-16 lg:h-20 px-6 lg:px-8 group"
              >
                <div className="relative w-auto max-w-[200px] lg:max-w-[240px] h-full flex items-center justify-center">
                  <img
                    className={cn(
                      "w-auto h-full object-contain",
                      "opacity-60 grayscale transition-all duration-500",
                      "group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105",
                      "filter brightness-0.95"
                    )}
                    alt={item.title?.rendered || `Company logo ${idx + 1}`}
                    src={item.acf.logo}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
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

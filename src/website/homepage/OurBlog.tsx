"use client";
import React, { useRef, useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";

import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import { useGetBlogs } from "../hooks";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { ArrowRightSvg } from "@/components/svgs";

export default function OurBlog() {
  const { data, isPending } = useGetBlogs();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !data || data.length === 0) return;

    const scrollSpeed = 0.5; // pixels per frame (slower for better UX)
    const slowScrollSpeed = 0.05; // much slower when hovered

    const scroll = () => {
      if (!container) return;

      if (!isHovered) {
        container.scrollLeft += scrollSpeed;

        // Reset to beginning when reaching the end for seamless loop
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        }
      } else {
        // Very slow scroll when hovered - almost stopped
        container.scrollLeft += slowScrollSpeed;
      }
    };

    scrollIntervalRef.current = setInterval(scroll, 16); // ~60fps

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [data, isHovered]);

  return (
    <section className="relative container max-w-7xl px-4 py-16 lg:py-24 lg:px-6 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
        <div className="space-y-4">
          {/* Eyebrow with accent */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-primary rounded-full" />
            <h3 className="tracking-[0.15em] font-semibold text-xs lg:text-sm uppercase text-primary">
              STORIES FROM OUR BLOG
            </h3>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl lg:text-6xl font-semibold leading-tight text-neutral-900 playfair-display">
            Your growth is our
            <br className="hidden lg:block" />
            <span className="text-primary">business.</span> Explore
            <br className="hidden lg:block" /> resources and stories
            <br className="hidden lg:block" /> to inspire success
          </h1>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({
                className: "group border-2 border-primary/30 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md font-semibold px-6 py-6",
                variant: "default",
              })
            )}
          >
            BROWSE ARTICLES
            <ArrowRightSvg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {!isPending && data && data.length > 0 ? (
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-white z-10 pointer-events-none opacity-80" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-white z-10 pointer-events-none opacity-80" />

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "auto" }}
          >
            {data.map((item, idx) => (
              <Link
                href={`/blogs/${item.id}`}
                key={item.id}
                className="flex-shrink-0 w-[320px] lg:w-[400px] group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <article className="relative flex flex-col h-full bg-white rounded-2xl border-2 border-neutral-200/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
                  {/* Image Container */}
                  <div className="relative h-[240px] lg:h-[260px] overflow-hidden bg-neutral-100">
                    <BlurImage
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      alt={item.title.rendered}
                      src={item.acf.thumbnail}
                    />
                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/60 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 lg:p-7">
                    {/* Title */}
                    <h2 className="text-xl lg:text-2xl font-bold line-clamp-2 mb-4 text-neutral-900 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {item.title.rendered}
                    </h2>

                    {/* Meta Information */}
                    <div className="mt-auto pt-5 border-t-2 border-neutral-100 group-hover:border-primary/20 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                            Published
                          </span>
                          <span className="text-sm text-neutral-800 font-semibold">
                            {formatDate(item.date_gmt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-300">
                          <span>Read More</span>
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ArrowRightSvg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 pointer-events-none" />
                </article>
              </Link>
            ))}
          </div>
        </div>
      ) : isPending ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-neutral-200 border-t-primary rounded-full animate-spin" />
            <p className="text-sm font-medium text-neutral-600">Loading inspiring stories...</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

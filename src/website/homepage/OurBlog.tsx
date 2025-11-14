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
    <section className="container max-w-7xl px-4 py-12 lg:py-20 lg:px-6">
      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
        <div className="space-y-3">
          <h3 className="tracking-[0.15em] font-semibold text-xs lg:text-sm uppercase text-neutral-600">
            STORIES FROM OUR BLOG
          </h3>
          <h1 className="text-3xl lg:text-5xl font-medium leading-tight">
            Your growth is our
            <br className="hidden lg:block" /> business. Explore
            <br className="hidden lg:block" /> resources and stories
            <br className="hidden lg:block" /> to inspire success
          </h1>
        </div>
        <div>
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({
                className: "border-neutral-200/60 group border bg-white/80 hover:bg-white backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md text-slate-600",
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
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollBehavior: "auto" }}
          >
            {data.map((item) => (
              <Link 
                href={`/blogs/${item.id}`} 
                key={item.id}
                className="flex-shrink-0 w-[320px] lg:w-[380px] group"
              >
                <article className="flex flex-col h-full bg-white rounded-xl border border-neutral-200/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative h-[220px] lg:h-[240px] overflow-hidden bg-neutral-100">
                    <BlurImage
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                      alt={item.title.rendered}
                      src={item.acf.thumbnail}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 lg:p-6">
                    {/* Title */}
                    <h2 className="text-lg lg:text-xl font-semibold line-clamp-2 mb-4 text-neutral-900 group-hover:text-accent-foreground transition-colors duration-300 leading-tight">
                      {item.title.rendered}
                    </h2>

                    {/* Meta Information */}
                    <div className="mt-auto pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
                            Published
                          </span>
                          <span className="text-sm text-neutral-700 font-medium">
                            {formatDate(item.date_gmt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground group-hover:gap-3 transition-all duration-300">
                          <span>Read More</span>
                          <ArrowRightSvg className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      ) : isPending ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-neutral-200 border-t-accent-foreground rounded-full animate-spin" />
            <p className="text-sm text-neutral-500">Loading blog posts...</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

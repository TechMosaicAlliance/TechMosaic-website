"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

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
    <section className=" p-4 max-w-7xl  container pt-[3rem]">
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-end justify-between">
        <div className="grid gap-4">
          <h3 className="tracking-wider">STORIES FROM OUR BLOG</h3>
          <h1 className="text-3xl lg:text-5xl">
            Your growth is our
            <br className="hidden lg:block" /> business. Explore
            <br className="hidden lg:block" /> resources and stories
            <br className="hidden lg:block" /> to inspire success
          </h1>
        </div>
        <div className="flex mb-2 gap-3">
          <Link
            href="/blogs"
            className={cn(
              buttonVariants({
                className: "border-white group border",
                variant: "default",
              })
            )}
          >
            BROWSE ARTICLES
            <ArrowRightSvg className="ml-1 h-4 w-4  transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {!isPending && data && data.length > 0 ? (
        <div className="pt-[4rem]">
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "auto" }}
          >
            {data.map((item) => (
              <Link 
                href={`/blogs/${item.id}`} 
                key={item.id}
                className="flex-shrink-0 w-[300px] lg:w-[350px]"
              >
                <article className="flex flex-col h-full">
                  <div className="min-h-[15rem] overflow-hidden relative w-full">
                    <BlurImage
                      className="object-cover transition-transform hover:scale-110"
                      fill
                      alt={item.title.rendered}
                      src={item.acf.thumbnail}
                    />
                  </div>
                  <div className="border h-full">
                    <div className="p-4 h-full grid gap-1">
                      <div className="border-b pb-4">
                        <h1 className="text-xl lg:text-2xl line-clamp-1 font-medium">
                          {item.title.rendered}
                        </h1>
                      </div>

                      <div className="flex pt-5 justify-between items-center">
                        <div>
                          <p className="text-sm">Author</p>
                          <span className="text-sm">{formatDate(item.date_gmt)}</span>
                        </div>

                        <div>
                          <Button className="rounded-none" variant="outline">
                            Read More
                          </Button>
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
        <div className="pt-[4rem] flex items-center justify-center min-h-[200px]">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      ) : null}
    </section>
  );
}

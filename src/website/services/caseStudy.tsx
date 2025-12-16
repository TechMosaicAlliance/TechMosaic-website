"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import { useGetCasestudy } from "../hooks";
import { ArrowRightSvg } from "@/components/svgs";
import { cn } from "@/lib/utils";

export default function CaseStudy() {
  const { data } = useGetCasestudy();

  return (
    <>
      {data && data?.length > 0 ? (
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
          <div 
            data-animation="trigger-fade-in-y"
            className="flex flex-col gap-4 sm:gap-6 lg:gap-0 lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="space-y-3 sm:space-y-4">
              <h3 className="tracking-[0.15em] font-semibold text-xs sm:text-sm uppercase text-primary">
                CASE STUDY
              </h3>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 playfair-display">
                Real success stories from
                <br className="hidden lg:block" /> our clients...
              </h1>
            </div>
            <div className="flex mb-2 gap-3">
              <div className="flex gap-3">
                <Link
                  href="/casestudy"
                  className={cn(
                    buttonVariants({
                      className: "border-white border text-xs sm:text-sm",
                      variant: "default",
                    })
                  )}
                >
                  View More
                  <ArrowRightSvg className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div 
            data-animation="trigger-fade-in-y"
            className="pt-8 sm:pt-12 lg:pt-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {data.length > 3
                ? data
                    .slice(0, 3)
                    .map((item, idx) => <Card item={item} key={item.id} />)
                : data.map((item, idx) => <Card item={item} key={item.id} />)}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

function Card({ item }: { item: any }) {
  return (
    <Link href={`/casestudy/${item.id}`}>
      <article className="grid overflow-hidden gap-4 sm:gap-5 group cursor-pointer">
        <div className="h-[16rem] sm:h-[19rem] lg:h-[22rem] overflow-hidden relative w-full rounded-xl lg:rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-300">
          <BlurImage
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            fill
            alt={item?.title?.rendered}
            src={item?.acf?.thumbnail}
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Text content always visible below image */}
        <div className="grid gap-2 sm:gap-3">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {item.title?.rendered}
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 line-clamp-3 leading-relaxed">
            {item.acf.text}
          </p>
        </div>
      </article>
    </Link>
  );
}

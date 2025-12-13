"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import { useGetPortfolio } from "../hooks";
import { cn } from "@/lib/utils";
import { ArrowRightSvg } from "@/components/svgs";
import { useHeroAnimation } from "../animations";

export default function OurPortfolio() {
  const { data } = useGetPortfolio();
  return (
    <>
      {data && data.length > 0 ? (
        <section className="relative container max-w-7xl p-4 pt-[4rem] lg:pt-[8rem] pb-12 lg:pb-20 overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row lg:items-end justify-between mb-10 lg:mb-16">
            <div className="space-y-4">
              {/* Eyebrow with accent */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-primary rounded-full" />
                <h3 className="tracking-[0.15em] font-semibold text-xs lg:text-sm uppercase text-primary">
                  OUR PORTFOLIO
                </h3>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl lg:text-6xl font-semibold leading-tight text-neutral-900 playfair-display">
                We&apos;re not just all talk
                <br className="hidden lg:block" />
                <span className="text-primary">we&apos;re this good</span>
              </h1>
            </div>

            <div className="flex mb-2 gap-3 flex-shrink-0">
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({
                    className: "group border-2 border-primary/30 bg-white hover:bg-primary hover:border-primary text-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md font-semibold px-6 py-6",
                    variant: "default",
                  })
                )}
              >
                VIEW MORE
                <ArrowRightSvg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto bars pt-4 lg:pt-8">
            <div className="lg:grid flex lg:grid-cols-3 gap-6 lg:gap-8">
              {data.length > 3
                ? data
                  .slice(0, 3)
                  .map((item, idx) => <Card item={item} key={idx} index={idx} />)
                : data.map((item, idx) => <Card item={item} key={idx} index={idx} />)}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

function Card({ item, index }: { item: any; index: number }) {
  return (
    <Link href={`/portfolio/${item.id}`} className="group">
      <article
        className="relative grid w-[20rem] lg:w-full gap-4 overflow-hidden rounded-2xl border-2 border-neutral-200/60 bg-white shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image Container */}
        <div className="h-[20rem] lg:h-[22rem] overflow-hidden relative w-full">
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
        <div className="px-6 pb-6 pt-2 grid gap-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300 leading-tight">
            {item.title.rendered}
          </h1>
          <p className="text-base lg:text-lg line-clamp-2 text-neutral-700 leading-relaxed">
            {item.acf.text}
          </p>

          {/* View more indicator */}
          <div className="flex items-center gap-2 mt-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span>View Project</span>
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRightSvg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 pointer-events-none" />
      </article>
    </Link>
  );
}

"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { BlurImage } from "@/components/ui/blurImage";
import { ArrowRightSvg } from "@/components/svgs";
import Link from "next/link";
import { useGetPortfolio } from "../hooks";
import { cn } from "@/lib/utils";

export default function ServicePortfolioView() {
  const { data } = useGetPortfolio();
  return (
    <>
      {data && data.length > 0 ? (
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-0 lg:items-end justify-between mb-8 sm:mb-12 lg:mb-16">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="tracking-[0.15em] font-semibold text-xs sm:text-sm uppercase text-primary">
                PORTFOLIO
              </h3>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 playfair-display">
                Our Featured Work
              </h2>
            </div>
            <div className="flex gap-3">
              <Link
                href="/career"
                className={cn(
                  buttonVariants({
                    className: "border-white border text-xs sm:text-sm h-9 sm:h-10",
                    variant: "default",
                  })
                )}
              >
                WORK WITH US
                <ArrowRightSvg className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="pt-8 sm:pt-12 lg:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {data.map((item, idx) => (
                <Link key={item.id} href={`/portfolio/${item.id}`}>
                  <article className="grid gap-3 sm:gap-4 group cursor-pointer">
                    <div className="lg:h-[24rem] h-[18rem] sm:h-[20rem] group overflow-hidden relative w-full rounded-xl lg:rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                      <BlurImage
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        fill
                        alt={item?.title?.rendered}
                        src={item.acf.thumbnail}
                      />
                      <div className="absolute w-full text-white transition-all ease-out duration-500 cursor-pointer overflow-hidden group-hover:h-full h-0 top-0 bottom-0">
                        <div className="w-full h-full absolute top-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
                        <div className="pt-1 relative z-10 items-center text-center p-6 sm:p-8 h-full justify-end pb-12 sm:pb-16 flex flex-col gap-2 sm:gap-3">
                          <p className="text-xs sm:text-sm uppercase tracking-wider opacity-80">Featured Project</p>
                          <h1 className="text-xl sm:text-2xl lg:text-3xl line-clamp-2 font-semibold">
                            {item.title.rendered}
                          </h1>
                          <p className="text-sm sm:text-base max-w-md line-clamp-3 opacity-90">
                            {item.acf.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

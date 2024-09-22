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
        <section className="container max-w-7xl p-4 pt-[4rem] lg:pt-[7rem]">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-end justify-between">
            <div className="grid  gap-4">
              <h3 className="tracking-wider">PORTFOLIO</h3>
            </div>
            <div className="hidden lg:flex gap-3">
              <Link
                href="/career"
                className={cn(
                  buttonVariants({
                    className: "border-white  h-8 text-xs   border",
                    variant: "default",
                  })
                )}
              >
                WORK WITH US
                <ArrowRightSvg className="ml-2" />
              </Link>
            </div>
          </div>

          <div className="lg:pt-[4rem] pt-[2rem]">
            <div className="grid lg:grid-cols-2 gap-10">
              {data.map((item, idx) => (
                <Link key={item.id} href={`/portfolio/${item.id}`}>
                  <article className="grid gap-2">
                    <div className="lg:h-[24rem] h-[16rem] group overflow-hidden relative w-full">
                      <BlurImage
                        className="object-cover"
                        fill
                        alt={item?.title?.rendered}
                        src={item.acf.thumbnail}
                      />
                      <div className="absolute w-full  text-[#FCFCFC] transition-all ease-out duration-500 cursor-pointer overflow-hidden group-hover:h-full h-0 top-0 bottom-0">
                        <div className="w-full h-full absolute top-0 bg-black/70"></div>
                        <div className="pt-1 relative z-10 items-center text-center p-4  h-full justify-end pb-14 flex flex-col gap-1">
                          <p className="text-sm">Highlighted Section</p>
                          <h1 className="text-2xl line-clamp-2 font-medium">
                            {item.title.rendered}
                          </h1>
                          <p className="text-sm max-w-md line-clamp-3">
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

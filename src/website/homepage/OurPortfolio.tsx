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
        <section className="container max-w-7xl p-4  pt-[4rem] lg:pt-[7rem]">
          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-end justify-between">
            <div className="grid gap-4">
              <h3 className="tracking-wider">OUR PORTFOLIO</h3>
              <h1 className="text-3xl lg:text-5xl">
                We&apos;re not just all talk
                <br className="hidden lg:block" /> we&apos;re this good
              </h1>
            </div>
            <div className="flex mb-2 gap-3">
              {/* <Button variant="outline" className="rounded-none" size="icon">
                <ArrowLeft />
              </Button>
              <Button className="rounded-none" size="icon">
                <ArrowRight />
              </Button> */}
              <Link
                href="/portfolio"
                className={cn(
                  buttonVariants({
                    className: "border-white group border",
                    variant: "default",
                  })
                )}
              >
                VIEW MORE
                <ArrowRightSvg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className=" overflow-x-auto bars pt-8 lg:pt-[4rem]">
            <div className="lg:grid flex lg:grid-cols-3 gap-4">
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
    <Link href={`/portfolio/${item.id}`}>
      <article className="grid w-[18rem] lg:w-full gap-2" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="h-[18rem] overflow-hidden relative w-full">
          <BlurImage
            className="object-cover transition-transform hover:scale-110 "
            fill
            alt={item.title.rendered}
            src={item.acf.thumbnail}
          />
        </div>
        <div className="pt-1 grid gap-1">
          <h1 className="text-2xl font-medium text-black">{item.title.rendered}</h1>
          <p className="text-lg line-clamp-2 text-black">{item.acf.text}</p>
        </div>
      </article>
    </Link>
  );
}

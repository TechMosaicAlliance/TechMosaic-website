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
        <section className="container max-w-7xl p-4 pt-[4rem] lg:pt-[7rem]">
          <div 
            data-animation="trigger-fade-in-y"
            className="flex flex-col gap-4 lg:gap-0  lg:flex-row lg:items-end justify-between"
          >
            <div className="grid gap-4">
              <h3 className="tracking-wider">CASE STUDY</h3>
              <h1 className="lg:text-5xl text-3xl">
                Real success stories from
                <br className="hidden lg:block" /> our clients.../
              </h1>
            </div>
            <div className="flex mb-2 gap-3">
              {/* <Button variant="outline" className="rounded-none" size="icon">
                <ArrowLeft />
              </Button>
              <Button className="rounded-none" size="icon">
                <ArrowRight />
              </Button> */}
              <div className="hidden lg:flex gap-3">
                <Link
                  href="/casestudy"
                  className={cn(
                    buttonVariants({
                      className: "border-white  border",
                      variant: "default",
                    })
                  )}
                >
                  View More
                  <ArrowRightSvg className="ml-2" />
                </Link>
              </div>
            </div>
          </div>

          <div 
            data-animation="trigger-fade-in-y"
            className="pt-[4rem]"
          >
            <div className="grid lg:grid-cols-3 gap-4">
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
      <article className="grid overflow-hidden gap-4 group">
        <div className="h-[19rem] overflow-hidden relative w-full rounded-lg">
          <BlurImage
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            fill
            alt={item?.title?.rendered}
            src={item?.acf?.thumbnail}
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
        {/* Text content always visible below image */}
        <div className="grid gap-2">
          <h1 className="text-xl lg:text-2xl font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {item.title?.rendered}
          </h1>
          <p className="text-sm lg:text-base text-neutral-700 line-clamp-3 leading-relaxed">
            {item.acf.text}
          </p>
        </div>
      </article>
    </Link>
  );
}

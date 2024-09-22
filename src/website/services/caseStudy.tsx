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
          <div className="flex flex-col gap-4 lg:gap-0  lg:flex-row lg:items-end justify-between">
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

          <div className="pt-[4rem]">
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
      <article className="grid overflow-hidden gap-2">
        <div className="h-[19rem] group overflow-hidden relative w-full">
          <BlurImage
            className="object-cover  group-hover:scale-125  transition-transform"
            fill
            alt={item?.title?.rendered}
            src={item?.acf?.thumbnail}
          />
          <div className="absolute w-full  text-[#FCFCFC] transition-all duration-500 cursor-pointer overflow-hidden group-hover:h-full h-[30rem] top-0 bottom-0">
            <div className="pt-1 relative z-10 items-center text-center p-4  h-full justify-end pb-14 flex flex-col gap-1">
              <h1 className="text-2xl line-clamp-2 font-medium">
                {item.title?.rendered}
              </h1>
              <p className="text-sm line-clamp-3">{item.acf.text}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

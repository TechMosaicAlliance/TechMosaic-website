"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";

import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import { useGetBlogs } from "../hooks";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { ArrowRightSvg } from "@/components/svgs";
import { useHeroAnimation } from "../animations";

export default function OurBlog() {
  const { data } = useGetBlogs();
  return (
    <>
      {data && data.length > 0 ? (
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

          <div className="pt-[4rem]">
            <div className="grid lg:grid-cols-3 gap-4">
              {data?.map((item) => (
                <Link href={`/blogs/${item.id}`} key={item.id}>
                  <article className="flex flex-col ">
                    <div className=" min-h-[15rem] overflow-hidden relative w-full">
                      <BlurImage
                        className="object-cover  transition-transform hover:scale-110 "
                        fill
                        alt={item.title.rendered}
                        src={item.acf.thumbnail}
                      />
                    </div>
                    <div className="border h-full ">
                      <div className="p-4  h-full grid gap-1">
                        <div className="border-b pb-4">
                          <h1 className="text-2xl line-clamp-3 font-medium">
                            {item.title.rendered}
                          </h1>
                        </div>

                        <div className="flex pt-5 justify-between items-center">
                          <div>
                            <p>Author</p>
                            <span>{formatDate(item.date_gmt)}</span>
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
        </section>
      ) : (
        ""
      )}
    </>
  );
}

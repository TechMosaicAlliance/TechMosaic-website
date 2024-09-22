"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import { ArrowRightSvg } from "@/components/svgs";
import { useHeroAnimation } from "../animations";

const data = [
  {
    name: "Graphic Design",
    text: "Creative designs that tell your story. elevate your brand image and drive growth",
  },
  {
    name: "Copywriting",
    text: "Craft compelling copy that resonates with your audience and inspires action.",
  },
  {
    name: "UI/UX Design",
    text: "Design user-friendly interfaces that offer an engaging and intuitive experience.",
  },
  {
    name: "Web Development",
    text: "Develop robust websites that are fast, secure, and tailored to your business needs.",
  },
  {
    name: "Brand Design",
    text: "Build a strong and recognizable brand that stands out in the competitive market.",
  },
];

export default function OurService() {
  const [open, setOpen] = useState(0);
  return (
    <section className="container max-w-7xl p-4 lg:pt-[3rem]">
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-end justify-between">
        <div data-animation="trigger-fade-in-y" className="grid gap-4 ">
          <h3 className="tracking-wider ">OUR SERVICES</h3>
          <h1 className="text-3xl lg:text-5xl">
            Reliable and
            <br /> affordable custom
            <br /> solutions that work
          </h1>
        </div>
        <div className="mb-2">
          <Link
            href="/services"
            className={cn(
              buttonVariants({
                className: "border-white group border",
                variant: "default",
              })
            )}
          >
            EXPLORE OUR SERVICES
            <ArrowRightSvg className="ml-1 h-4 w-4  transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="pt-8 lg:pt-[4rem]">
        <div className="grid w-full h-fit gap-10">
          <section className="flex flex-col lg:flex-row items-center  w-full lg:gap-[7rem]">
            <div className=" grid max-w-xl gap-8">
              <div className="flex flex-shrink-0 flex-col gap-3">
                {data.map((item, idx) => (
                  <div
                    onClick={() => setOpen(idx)}
                    key={idx}
                    className={cn(
                      open === idx
                        ? "bg-[#FAFAF9]  text-accent-foreground"
                        : "",
                      "flex group border-b transition-all hover:text-accent-foreground  hover:bg-[#FAFAF9]   p-4 gap-2 "
                    )}
                  >
                    <Plus className="flex-shrink-0  mt-1" size={18} />
                    <div className="grid gap-3">
                      <h1 className=" flex gap-1 font-medium text-xl">
                        {item.name}
                      </h1>
                      {idx === open && (
                        <p className="  text-neutral-700   group-hover:text-neutral-700 ">
                          {item.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              data-animation="trigger-fade-in-y"
              className=" opacity-0  lg:flex h-[23rem] lg:h-[35rem] w-full relative overflow-hidden  rounded-sm lg:w-1/2 border bg-background p-10 gap-3"
            >
              <BlurImage
                className="object-cover"
                src="/assets/services1.png"
                alt=""
                fill
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

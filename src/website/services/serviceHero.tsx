"use client";
import { BlurImage } from "@/components/ui/blurImage";
import React from "react";
import { useHeroAnimation } from "../animations";
import { useGetContents } from "../hooks";

export default function ServiceHero() {
  useHeroAnimation();
  return (
    <section className="pb-10 lg:h-[90dvh] 2xl:h-full">
      <div className="container max-w-7xl p-4 flex-col lg:flex-row items-center gap-10 justify-between flex pt-[5rem] md:pt-[3rem] mx-auto">
        <div className="grid gap-4">
          <div className="grid gap-4">
            <p data-animation="fade-in-y" className="opacity-0">
              WHAT WE DO
            </p>
            <h2
              data-animation="fade-in-y"
              className="lg:text-6xl opacity-0 text-4xl lg:leading-[4.6rem] font-medium"
            >
              Reliable and
              <br /> affordable custom <br />
              solutions{" "}
              <span className="playfair-display italic">that work</span>
            </h2>
          </div>
          <p
            data-animation="fade-in-y"
            className="lg:text-xl opacity-0 text-lg max-w-2xl"
          >
            Explore the groundbreaking projects powered by TechMosaic,
            showcasing its remarkable capabilities and transformative diverse
            industries.
          </p>
        </div>

        <div className="relative  overflow-hidden  max-w-lg w-full h-[27rem] lg:h-[35rem]">
          <BlurImage
            alt=""
            src="/assets/ourservice.png"
            fill
            className=" object-cover aspect-auto"
          />
        </div>
      </div>
    </section>
  );
}

"use client";
import { BlurImage } from "@/components/ui/blurImage";
import React from "react";
import { useHeroAnimation } from "../animations";
import { useGetContents } from "../hooks";

export default function ServiceHero() {
  useHeroAnimation();
  return (
    <section className="pb-10 lg:pb-16 lg:min-h-[85vh] flex items-center">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16 justify-between">
          <div className="flex-1 max-w-3xl space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <p 
                data-animation="fade-in-y" 
                className="opacity-0 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-primary"
              >
                WHAT WE DO
              </p>
              <h1
                data-animation="fade-in-y"
                className="opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight"
              >
                Reliable and
                <br /> affordable custom <br />
                solutions{" "}
                <span className="playfair-display italic text-primary">that work</span>
              </h1>
            </div>
            <p
              data-animation="fade-in-y"
              className="opacity-0 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              Explore the groundbreaking projects powered by TechMosaic,
              showcasing its remarkable capabilities and transformative impact across
              diverse industries.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl max-w-lg w-full h-[27rem] sm:h-[32rem] lg:h-[35rem] xl:h-[40rem] shadow-2xl">
            <BlurImage
              alt="Our Services"
              src="/assets/ourservice.png"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

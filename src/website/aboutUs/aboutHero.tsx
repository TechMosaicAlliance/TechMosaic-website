"use client";
import { BlurImage } from "@/components/ui/blurImage";
import React from "react";
import { useHeroAnimation } from "../animations";
import { useGetContents } from "../hooks";

const data = [
  {
    name: "High Altitude Wonders",
    text: "Towering above the earth, mountain peaks command attention with their sheer magnitude and grandeur. Each summit tells a story of resilience.",
  },
  {
    name: "High Altitude Wonders",
    text: "Towering above the earth, mountain peaks command attention with their sheer magnitude and grandeur. Each summit tells a story of resilience.",
  },
  {
    name: "High Altitude Wonders",
    text: "Towering above the earth, mountain peaks command attention with their sheer magnitude and grandeur. Each summit tells a story of resilience.",
  },
  {
    name: "High Altitude Wonders",
    text: "Towering above the earth, mountain peaks command attention with their sheer magnitude and grandeur. Each summit tells a story of resilience.",
  },
];

export default function AboutUsHero() {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="container max-w-7xl p-4 items-center gap-10 justify-between flex pt-[5rem] lg:pt-[6rem] mx-auto">
        <div className="grid gap-4">
          <div className="grid gap-4">
            <p data-animation="fade-in-y" className="tracking-wider opacity-0">
              WHY TECHMOSAIC
            </p>
            <h2
              data-animation="fade-in-y"
              className=" opacity-0 text-5xl lg:text-7xl lg:leading-[5rem] font-medium"
            >
              You need
              <br /> partners who
              <br />
              listen
              <span className="playfair-display italic"> ...we do</span>
            </h2>
          </div>
          <p data-animation="fade-in-y" className="text-xl opacity-0 max-w-2xl">
            We take your requirements and execute your projects from conception
            to launch
          </p>
        </div>
      </div>
      <HeroImage />
      {/* <div className="lg:pt-[8rem] pt-[6rem] p-4 container mx-auto">
        <div className="grid grid-cols-4 gap-5">
          {contentData?.images.map((item, idx) => (
            <article
              key={idx}
              className="grid odd:-mt-[3rem] lg:odd:-mt-[5rem] gap-2"
            >
              <div className="lg:h-[33rem] h-[15rem] group overflow-hidden relative w-full">
                <BlurImage
                  className="object-cover"
                  fill
                  alt=""
                  src={"/assets/portfolio1.png"}
                />
              </div>
            </article>
          ))}
        </div>
      </div> */}
    </section>
  );
}

function HeroImage() {
  const { data: contentData, isPending } = useGetContents();
  useHeroAnimation({ dataLoaded: isPending ? false : true });
  return (
    <div className="lg:pt-[8rem] pt-[6rem] p-4 container mx-auto">
      <div className="grid grid-cols-4 gap-5">
        {contentData?.images.map((item, idx) => (
          <article
            key={idx}
            className="grid odd:-mt-[3rem] lg:odd:-mt-[5rem] gap-2"
          >
            <div className="lg:h-[33rem] h-[15rem] group overflow-hidden relative w-full">
              <BlurImage
                className="object-cover"
                fill
                alt=""
                src={"/assets/portfolio1.png"}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

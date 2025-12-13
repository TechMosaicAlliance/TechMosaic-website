import React from "react";
import Hero from "./Hero";
import WebLayout from "../shared/WebLayout";
import Marquee from "./Marquee";
import OurService from "./OurService";
import OurPortfolio from "./OurPortfolio";
import { companyMarqueeData, productMarqueeData } from "@/services/dummyData";
import OurBlog from "./OurBlog";
import HomeMarque from "./HomeMarque";
import CaseStudy from "../services/caseStudy";

export default function HomePage() {
  return (
    <WebLayout showNav={false}>
      <Hero />
      <HomeMarque />
      <OurService />
      <OurPortfolio />
      <CaseStudy />
      <Marquee>
        <div className="flex lg:pt-[4rem] lg:pb-[2rem] gap-8 lg:gap-12 items-center">
          {productMarqueeData.map((item, idx) => (
            <div
              className="group relative"
              key={idx}
            >
              {/* Border container with theme color */}
              <div className="relative px-6 py-3 lg:px-8 lg:py-4 rounded-2xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-500">
                {/* Inner content with backdrop */}
                <div className="relative px-4 py-2 lg:px-6 lg:py-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm group-hover:shadow-md group-hover:bg-white transition-all duration-500">
                  <div className="text-2xl lg:text-3xl playfair-display font-semibold tracking-tight text-primary">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 blur-xl transition-all duration-700 -z-10" />
            </div>
          ))}
        </div>
      </Marquee>
      <OurBlog />
    </WebLayout>
  );
}

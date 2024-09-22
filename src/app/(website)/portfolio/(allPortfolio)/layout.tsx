import PortfolioHero from "@/website/portfolio/PortHero";
import TailoringView from "@/website/portfolio/Tailoring";
import Filter from "@/website/shared/Filter";
import YoutubeView from "@/website/shared/Youtube";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Portfolio | Creative Solutions for Business Growth",
  description:
    "View our diverse portfolio of personalized design projects. See how we've helped businesses stand out in competitive markets through creative and effective solutions.",
  keywords:
    "design portfolio, creative projects, business growth showcase, market differentiation, visual examples",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container max-w-7xl p-4 pt-[5rem] mx-auto">
      <PortfolioHero />
      <div className="pt-[4rem]">
        <Filter url="/portfolio" />
      </div>
      {children}
      <div className="pt-[3rem]">
        <div className="h-[15rem] lg:h-full">
          <YoutubeView videoSrc="/assets/video1.mp4" />
        </div>
        <TailoringView />
      </div>
    </section>
  );
}

import OurService from "@/website/homepage/OurService";
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
    <div className="min-h-screen bg-white">
      <section className="container max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12 mx-auto">
        <PortfolioHero />
        
        {/* Video Section */}
        <div className="mt-16 mb-20">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative h-[22rem] sm:h-[28rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 bg-gray-900">
              <YoutubeView videoSrc="/assets/video1.mp4" />
            </div>
          </div>
        </div>

        <div className="pt-6 pb-10 border-t border-gray-100">
          <Filter url="/portfolio" />
        </div>
        <div className="pt-8">
          {children}
        </div>
      </section>
      <div className="bg-gray-50 border-t border-gray-100 mt-20">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-16">
          <OurService />
        </div>
      </div>
    </div>
  );
}

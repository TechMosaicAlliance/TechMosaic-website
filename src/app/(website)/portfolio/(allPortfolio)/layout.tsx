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
    <div className="min-h-screen bg-gray-50">
      <section className="container max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8 mx-auto">
        <PortfolioHero />
        
        {/* Video Section */}
        <div className="mt-12 mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative h-[20rem] sm:h-[25rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-gray-900">
              <YoutubeView videoSrc="/assets/video1.mp4" />
            </div>
          </div>
        </div>

        <div className="pt-8 pb-8">
          <Filter url="/portfolio" />
        </div>
        {children}
      </section>
      <div className="bg-white border-t border-gray-200">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-12">
          <OurService />
        </div>
      </div>
    </div>
  );
}

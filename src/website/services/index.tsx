import React from "react";
import ServiceHero from "./serviceHero";
import WhatWeDo from "./whatWeDo";
import CaseStudy from "./caseStudy";
import ServicePortfolioView from "./servicePortfolio";
import YoutubeView from "../shared/Youtube";
import TestimonialView from "./testimonial";
import { Button } from "@/components/ui/button";
import { ArrowRightSvg } from "@/components/svgs";
import ServiceYoutube from "./ServiceYoutube";

export default function ServicePage() {
  return (
    <>
      <ServiceHero />
      <ServiceYoutube />
      <WhatWeDo />
      <CaseStudy />
      <ServicePortfolioView />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12">
        <div className="flex pt-4 sm:pt-6 lg:hidden gap-3">
          <Button className="border-white group text-xs sm:text-sm border h-9 sm:h-10">
            JOIN OUR TEAM
            <ArrowRightSvg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      <TestimonialView />
    </>
  );
}

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
      <WhatWeDo />
      <CaseStudy />
      <ServicePortfolioView />
      <div className="container p-4 lg:pt-[4rem] mx-auto">
        <ServiceYoutube />

        <div className="flex pt-7 lg:hidden gap-3">
          <Button className="border-white group  text-xs  border">
            JOIN OUR TEAM
            <ArrowRightSvg className="ml-1 h-4 w-4  transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
      <TestimonialView />
    </>
  );
}

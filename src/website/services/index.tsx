import React from "react";
import ServiceHero from "./serviceHero";
import WhatWeDo from "./whatWeDo";
import CaseStudy from "./caseStudy";
import ServicePortfolioView from "./servicePortfolio";
import YoutubeView from "../shared/Youtube";
import TestimonialView from "./testimonial";
import { Button } from "@/components/ui/button";
import { ArrowRightSvg } from "@/components/svgs";

export default function ServicePage() {
  return (
    <>
      <ServiceHero />
      <WhatWeDo />
      <CaseStudy />
      <ServicePortfolioView />
      <div className="container p-4 lg:pt-[4rem] mx-auto">
        <YoutubeView videoSrc="/assets/video1.mp4" />

        <div className="flex pt-7 lg:hidden gap-3">
          <Button className="border-white  text-xs  border">
            JOIN OUR TEAM
            <ArrowRightSvg className="ml-2" />
          </Button>
        </div>
      </div>
      <TestimonialView />
    </>
  );
}

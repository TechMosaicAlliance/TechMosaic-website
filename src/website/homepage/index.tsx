import React from "react";
import Hero from "./Hero";
import WebLayout from "../shared/WebLayout";
import Marquee from "./Marquee";
import OurService from "./OurService";
import OurPortfolio from "./OurPortfolio";
import { companyMarqueeData, productMarqueeData } from "@/services/dummyData";
import OurBlog from "./OurBlog";
import HomeMarque from "./HomeMarque";

export default function HomePage() {
  return (
    <WebLayout showNav={false}>
      <Hero />
      <HomeMarque />
      <OurService />
      <OurPortfolio />
      <Marquee>
        <div className="flex lg:pt-[4rem] lg:pb-[2rem] gap-10 items-center">
          {productMarqueeData.map((item, idx) => (
            <div
              className=" text-3xl playfair-display font-medium lg:text-4xl tracking-tight"
              key={idx}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </Marquee>
      <OurBlog />
    </WebLayout>
  );
}

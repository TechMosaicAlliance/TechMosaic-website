"use client";
import React from "react";
import { useHeroAnimation } from "../animations";

export default function PortfolioHero() {
  useHeroAnimation();
  return (
    <div className="">
      <div className="grid gap-4">
        <div className="grid gap-4">
          <p data-animation="fade-in-y" className="tracking-wider opacity-0">
            PORTFOLIO
          </p>
          <h2
            data-animation="fade-in-y"
            className="lg:text-6xl opacity-0 text-4xl lg:leading-[4.4rem] font-medium"
          >
            We are not just
            <br /> talk ...{" "}
            <span className="playfair-display italic">we know</span>
            <br />
            <span className="playfair-display italic">what we are doing</span>
          </h2>
        </div>
        <p
          data-animation="fade-in-y"
          className="lg:text-xl opacity-0 text-lg max-w-2xl"
        >
          Explore the groundbreaking projects powered by TechMosaic, showcasing
          its remarkable capabilities and transformative diverse industries.
        </p>
      </div>
    </div>
  );
}

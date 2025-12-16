"use client";
import React from "react";
import { useHeroAnimation } from "../animations";

export default function PortfolioHero() {
  useHeroAnimation();
  return (
    <div className="max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-6">
          <p 
            data-animation="fade-in-y" 
            className="tracking-wider opacity-0 text-sm font-semibold uppercase text-primary/70"
          >
            PORTFOLIO
          </p>
          <h2
            data-animation="fade-in-y"
            className="lg:text-6xl opacity-0 text-4xl lg:leading-[4.4rem] font-bold text-gray-900"
          >
            We are not just
            <br /> talk ...{" "}
            <span className="playfair-display italic text-primary">we know</span>
            <br />
            <span className="playfair-display italic text-primary">what we are doing</span>
          </h2>
        </div>
        <p
          data-animation="fade-in-y"
          className="lg:text-xl opacity-0 text-lg max-w-2xl text-gray-600 leading-relaxed"
        >
          Explore the groundbreaking projects powered by TechMosaic, showcasing
          its remarkable capabilities and transformative impact across diverse industries.
        </p>
      </div>
    </div>
  );
}

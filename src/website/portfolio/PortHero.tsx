"use client";
import React from "react";
import { useHeroAnimation } from "../animations";

export default function PortfolioHero() {
  useHeroAnimation();
  return (
    <div className="max-w-5xl">
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent"></div>
            <p 
              data-animation="fade-in-y" 
              className="tracking-[0.2em] opacity-0 text-xs font-semibold uppercase text-primary/80"
            >
              PORTFOLIO
            </p>
          </div>
          <h2
            data-animation="fade-in-y"
            className="lg:text-7xl opacity-0 text-4xl lg:leading-[1.1] font-bold text-gray-900 tracking-tight"
          >
            We are not just
            <br />
            <span className="text-gray-400">talk</span>
            <span className="text-gray-900">...</span>{" "}
            <span className="playfair-display italic text-primary font-normal">we know</span>
            <br />
            <span className="playfair-display italic text-primary font-normal">what we are doing</span>
          </h2>
        </div>
        <p
          data-animation="fade-in-y"
          className="lg:text-xl opacity-0 text-base max-w-2xl text-gray-500 leading-relaxed font-light"
        >
          Explore the groundbreaking projects powered by TechMosaic, showcasing
          its remarkable capabilities and transformative impact across diverse industries.
        </p>
      </div>
    </div>
  );
}

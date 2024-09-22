"use client";
import { useHeroAnimation } from "../animations";

export function BlogHero() {
  useHeroAnimation();
  return (
    <div className="">
      <div className="grid gap-4">
        <div className="grid gap-4">
          <p data-animation="fade-in-y" className="tracking-wider opacity-0">
            INSIGHTS
          </p>
          <h2
            data-animation="fade-in-y"
            className="lg:text-6xl opacity-0 text-4xl lg:leading-[4.7rem] font-medium"
          >
            Insights on
            <br />
            <span className="playfair-display italic">Growth and </span>
            <br />
            <span className="playfair-display italic">Marketing</span>
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

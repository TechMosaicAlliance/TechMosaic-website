"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../shared/Navbar";
import { ArrowRight } from "lucide-react";
import { useHeroAnimation } from "../animations";
import TextPlugin from "gsap/TextPlugin";
import gsap, { Power4, Power2 } from "gsap";
import Link from "next/link";

const words = [
  {
    text: "Web Development",
    style: "italic playfair-display font-semibold text-custom-conic-gradient",
  },
  {
    text: "Brand Design",
    style: "italic playfair-display  font-semibold text-custom-conic-gradient",
  },
  {
    text: "Project Management",
    style: "italic playfair-display  font-semibold text-custom-conic-gradient",
  },
  {
    text: "Creative Writing",
    style: "italic playfair-display font-semibold text-custom-conic-gradient",
  },
  {
    text: "UI/UX",
    style: "italic playfair-display font-semibold text-custom-conic-gradient",
  },
];

gsap.registerPlugin(TextPlugin);
export default function Hero() {
  useHeroAnimation();
  const wordRef = useRef<any>(null);
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((word, index) => {
      tl.to(wordRef.current, {
        duration: 1,
        y: "0%",
        ease: Power4.easeOut,
        onStart: () => {
          wordRef.current.textContent = word.text;
          wordRef.current.className = `relative inline-flex items-center justify-center italic playfair-display text-custom-conic-gradient px-4 md:px-6 py-2 md:py-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-[#f27121] shadow-lg font-bold text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-nowrap`;
          wordRef.current.style.boxShadow = "0 8px 32px 0 rgba(242, 113, 33, 0.4)";
        },
      })
        .to({}, { duration: 1 })
        .to(wordRef.current, {
          duration: 0.1,
          y: "100%",
          ease: Power4.easeIn,
        });
    });
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Smooth staggered animation for the title and paragraph text
    timeline.fromTo(
      '[data-animation="hero-fade-in-y"]',
      { yPercent: 80, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        ease: Power2.easeOut,
        duration: 1, // Make the reveal slower and smoother
        stagger: {
          amount: 0.6, // Stagger the animation for each element to make it look smooth
        },
      }
    );
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] hero-section h-[100svh] 2xl:h-[54rem] relative overflow-hidden">
      <Navbar />
      <div className="grid grid-cols-1 grid-rows-1 relative">
        {/* Background Image with Enhanced Overlay */}
        <Image
          priority
          alt="Hero background"
          src="/assets/hero-image.webp"
          fill
          className="object-cover col-span-full row-span-full"
        />
        {/* Enhanced gradient overlay for better contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#191919]/70 via-[#191919]/55 to-[#191919]/75 col-span-full row-span-full z-[1]" />
        
        {/* Subtle purple accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#451842]/5 via-transparent to-transparent col-span-full row-span-full z-[1]" />
        
        {/* Refined decorative geometric elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-[#451842]/10 rounded-full blur-3xl z-[2] hidden lg:block" />
        <div className="absolute bottom-32 left-10 w-32 h-32 bg-[#451842]/8 rounded-full blur-2xl z-[2] hidden lg:block" />

        <section className="relative py-14 col-span-full pt-[5rem] row-span-full z-10 container max-w-7xl mx-auto px-5 lg:px-8 lg:py-24 flex flex-col md:justify-center">
          <div className="grid gap-10 lg:gap-14 max-w-6xl w-full">
            {/* Main Heading with Enhanced Typography */}
            <div data-animation="hero-fade-in-y" className="opacity-0">
              <h1 className="lg:text-7xl text-5xl font-bold lg:font-semibold tracking-tight text-white leading-[1.1] break-words mb-4">
                Fueling Your Business <br />
                <span className="text-white/90 font-medium">Growth through</span> <br />
                <span className="relative inline-block mt-3">
                  <span className="text-white">Personalized</span>
                  <span className="relative inline-flex items-center justify-center ml-3 md:ml-4">
                    <span
                      ref={wordRef}
                      className="relative inline-flex items-center justify-center italic playfair-display text-custom-conic-gradient px-4 md:px-6 py-2 md:py-3 rounded-xl bg-white/10 backdrop-blur-md border-2 border-[#f27121] shadow-lg font-bold text-3xl md:text-4xl lg:text-5xl leading-tight whitespace-nowrap"
                      style={{ transform: "translateY(100%)", boxShadow: "0 8px 32px 0 rgba(242, 113, 33, 0.4)" }}
                    >
                      {words[0].text}
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Enhanced Description */}
            <div className="max-w-3xl" data-animation="hero-fade-in-y">
              <p className="lg:text-xl opacity-0 text-lg text-white/85 leading-relaxed font-light tracking-wide">
                We fuse creativity, effective management, and a shared industry
                experience of over two decades to help you stand out in a
                competitive market
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              data-animation="hero-fade-in-y"
              className="opacity-0 flex flex-col sm:flex-row gap-4 mt-2"
            >
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 md:px-10 md:py-5 rounded-xl font-semibold text-sm md:text-base bg-[#451842] text-white border-2 border-[#451842] hover:bg-[#5a1f55] hover:border-[#5a1f55] hover:shadow-[0_8px_24px_rgba(69,24,66,0.4)] transition-all duration-300 ease-out"
                aria-label="Get Started - Contact Us"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 md:px-10 md:py-5 rounded-xl font-semibold text-sm md:text-base bg-white/5 backdrop-blur-sm text-white border-2 border-[#f27121]/60 hover:bg-white/10 hover:border-[#f27121] hover:shadow-[0_8px_24px_rgba(242,113,33,0.2)] transition-all duration-300 ease-out"
                aria-label="View Our Services"
              >
                <span>Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

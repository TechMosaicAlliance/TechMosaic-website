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
          wordRef.current.className = `relative inline-flex items-center justify-center italic playfair-display px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl backdrop-blur-md border-2 shadow-lg font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl leading-tight whitespace-nowrap`;
          wordRef.current.style.background = "linear-gradient(135deg, #f27121 0%, #e94057 100%)";
          wordRef.current.style.WebkitBackgroundClip = "text";
          wordRef.current.style.WebkitTextFillColor = "transparent";
          wordRef.current.style.backgroundClip = "text";
          wordRef.current.style.borderColor = "#f27121";
          wordRef.current.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
          wordRef.current.style.boxShadow = "0 8px 32px 0 rgba(242, 113, 33, 0.5)";
          wordRef.current.style.color = "#f27121";
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
    <div className="grid grid-rows-[auto_1fr] hero-section h-[100svh] min-h-[600px] sm:min-h-[700px] 2xl:h-[54rem] relative overflow-hidden">
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
        {/* Enhanced overlay for contrast and readability */}
        <div className="absolute inset-0 bg-black/75 col-span-full row-span-full z-[1]" />

        {/* Refined decorative geometric elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#f27121]/8 rounded-full blur-3xl z-[2] hidden lg:block" />
        <div className="absolute bottom-32 left-10 w-52 h-52 bg-[#451842]/12 rounded-full blur-3xl z-[2] hidden lg:block" />

        <section className="relative py-8 sm:py-12 md:py-14 col-span-full pt-[4rem] sm:pt-[5rem] row-span-full z-10 container max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 lg:py-24 flex flex-col md:justify-center">
          <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-14 max-w-6xl w-full">
            {/* Main Heading with Enhanced Typography and Contrast */}
            <div data-animation="hero-fade-in-y" className="opacity-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold lg:font-semibold tracking-tight text-white leading-[1.1] sm:leading-[1.15] break-words mb-3 sm:mb-4 drop-shadow-2xl">
                Fueling Your Business <br className="hidden sm:block" />
                <span className="text-white/95 font-medium">Growth through</span> <br className="hidden sm:block" />
                <span className="relative inline-block mt-2 sm:mt-3">
                  <span className="text-white">Personalized</span>
                  <span className="relative inline-flex items-center justify-center ml-2 sm:ml-3 md:ml-4">
                    <span
                      ref={wordRef}
                      className="relative inline-flex items-center justify-center italic playfair-display px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl backdrop-blur-md border-2 shadow-lg font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl leading-tight whitespace-nowrap"
                      style={{ 
                        transform: "translateY(100%)", 
                        background: "linear-gradient(135deg, #f27121 0%, #e94057 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        borderColor: "#f27121",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        boxShadow: "0 8px 32px 0 rgba(242, 113, 33, 0.5)",
                        color: "#f27121"
                      }}
                    >
                      {words[0].text}
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Enhanced Description with Better Contrast */}
            <div className="max-w-3xl" data-animation="hero-fade-in-y">
              <p className="lg:text-xl opacity-0 text-base sm:text-lg text-white/95 leading-relaxed font-light tracking-wide drop-shadow-lg">
                We fuse creativity, effective management, and a shared industry
                experience of over two decades to help you stand out in a
                competitive market
              </p>
            </div>

            {/* CTA Buttons with Enhanced Visibility and Responsiveness */}
            <div
              data-animation="hero-fade-in-y"
              className="opacity-0 flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2"
            >
              {/* Primary CTA - More Button-like with Better Hover */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base bg-[#451842] text-white border-2 border-[#451842] hover:bg-[#5a1f55] hover:border-[#5a1f55] hover:shadow-[0_12px_36px_rgba(69,24,66,0.6)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto cursor-pointer"
                aria-label="Get Started - Contact Us"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </Link>

              {/* Secondary CTA - Enhanced */}
              <Link
                href="/services"
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base bg-white/10 backdrop-blur-sm text-white border-2 border-[#f27121]/70 hover:bg-white/20 hover:border-[#f27121] hover:shadow-[0_12px_32px_rgba(242,113,33,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-md w-full sm:w-auto cursor-pointer"
                aria-label="View Our Services"
              >
                <span className="relative z-10">What We Do</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              </Link>
            </div>
            
            {/*  Button - Replaced Arrow with Button */}
            <div
              data-animation="hero-fade-in-y"
              className="opacity-0 flex justify-center mt-8 sm:mt-12"
            >
              <button
                onClick={() => {
                  const nextSection = document.querySelector('.hero-section')?.nextElementSibling;
                  nextSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Scroll to next section"
              >
              
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

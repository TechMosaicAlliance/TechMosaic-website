"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../shared/Navbar";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { useHeroAnimation } from "../animations";
import gsap, { Power4, Power2 } from "gsap";
import Link from "next/link";

const words = [
  "Web Development",
  "Brand Design",
  "Project Management",
  "Creative Strategy",
  "UI/UX Design",
];

export default function Hero() {
  useHeroAnimation();
  const wordRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!wordRef.current) return;
    
    const tl = gsap.timeline({ repeat: -1 });
    words.forEach((word) => {
      tl.to(wordRef.current, {
        duration: 0.8,
        y: "0%",
        opacity: 1,
        ease: Power4.easeOut,
        onStart: () => {
          if (wordRef.current) {
            wordRef.current.textContent = word;
          }
        },
      })
        .to({}, { duration: 1.5 })
        .to(wordRef.current, {
          duration: 0.5,
          y: "-100%",
          opacity: 0,
          ease: Power4.easeIn,
        });
    });
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.3 });

    timeline.fromTo(
      '[data-animation="hero-fade-in-y"]',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut,
        duration: 0.8,
        stagger: 0.15,
      }
    );

    // Fallback visibility
    setTimeout(() => {
      document.querySelectorAll('[data-animation="hero-fade-in-y"]').forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '1';
        }
      });
    }, 2500);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] hero-section h-[100svh] min-h-[700px] sm:min-h-[800px] relative overflow-hidden bg-white">
      <Navbar />
      <div className="grid grid-cols-1 grid-rows-1 relative">
        {/* Background Image */}
        <Image
          priority
          alt="Hero background"
          src="/assets/hero-image.webp"
          fill
          className="object-cover col-span-full row-span-full"
        />
        {/* Light Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 col-span-full row-span-full z-[1]" />

        {/* Minimal Decorative Elements */}
        <div className="absolute top-32 right-20 w-[500px] h-[500px] bg-[#451842]/8 rounded-full blur-[120px] z-[2] hidden lg:block" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[#451842]/6 rounded-full blur-[100px] z-[2] hidden lg:block" />

        <section className="relative col-span-full row-span-full z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-20 sm:py-24">
          <div className="max-w-4xl space-y-8 sm:space-y-10">
            
            {/* Trust Badge */}
            <div data-animation="hero-fade-in-y" className="opacity-0">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#451842]/10 backdrop-blur-sm border border-[#451842]/20">
                <Star className="w-4 h-4 text-[#451842] fill-[#451842]" />
                <span className="text-xs sm:text-sm font-semibold text-white/90">20+ Years Excellence</span>
              </div>
            </div>

            {/* Main Headline - Clean & Direct */}
            <div data-animation="hero-fade-in-y" className="opacity-0 space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Transform Your Business
                <br />
                <span className="text-white/80">with Expert</span>
                <br />
                <span className="relative inline-block mt-2">
                  <span 
                    ref={wordRef}
                    className="text-[#451842] font-bold"
                    style={{ 
                      display: "inline-block",
                      transform: "translateY(100%)",
                      opacity: 0,
                      minWidth: "300px"
                    }}
                  >
                    {words[0]}
                  </span>
                </span>
              </h1>
            </div>

            {/* Value Proposition - Clear & Concise */}
            <div data-animation="hero-fade-in-y" className="opacity-0 max-w-2xl">
              <p className="text-lg sm:text-xl lg:text-2xl text-white/70 leading-relaxed font-light">
                We deliver tailored digital solutions backed by two decades of industry expertise to help your business thrive.
              </p>
            </div>

            {/* Social Proof Points */}
            <div data-animation="hero-fade-in-y" className="opacity-0 flex flex-wrap gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#451842]" />
                <span className="text-sm sm:text-base text-white/60 font-medium">500+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#451842]" />
                <span className="text-sm sm:text-base text-white/60 font-medium">98% Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#451842]" />
                <span className="text-sm sm:text-base text-white/60 font-medium">Global Clients</span>
              </div>
            </div>

            {/* Primary CTA - Conversion Focused */}
            <div data-animation="hero-fade-in-y" className="opacity-0 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg bg-[#451842] text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-[#451842]/50"
                  aria-label="Get Started"
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#451842] to-[#5a1f55] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg bg-transparent text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                  aria-label="View Services"
                >
                  <span>View Services</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
              </div>
            </div>

            {/* Subtle Note */}
            <div data-animation="hero-fade-in-y" className="opacity-0">
              <p className="text-sm text-white/40">
                Free consultation • No commitment required
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

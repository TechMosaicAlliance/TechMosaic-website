"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useHeroAnimation } from "../animations";
import gsap, { Power4, Power2, Power3 } from "gsap";
import Link from "next/link";

const services = [
  { name: "Web Development", color: "from-purple-400 to-pink-400" },
  { name: "Brand Design", color: "from-blue-400 to-cyan-400" },
  { name: "Project Management", color: "from-emerald-400 to-teal-400" },
  { name: "Creative Strategy", color: "from-orange-400 to-red-400" },
  { name: "UI/UX Design", color: "from-violet-400 to-purple-400" },
];

const stats = [
  { value: "72+", label: "Happy Clients" },
  { value: "128+", label: "Projects" },
  { value: "57+", label: "Team Members" },
  { value: "99%", label: "Satisfaction" },
];

export default function Hero() {
  useHeroAnimation();
  const wordRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (!wordRef.current) return;
    
    const tl = gsap.timeline({ 
      repeat: -1, 
      delay: 1.5,
      onUpdate: function() {
        if (this.progress() > 0.2 && this.progress() < 0.3) {
          const index = Math.floor(this.totalTime() / 5.5) % services.length;
          setCurrentIndex(index);
        }
      }
    });
    
    services.forEach((service, index) => {
      if (index === 0) {
        tl.set(wordRef.current, {
          textContent: service.name,
          y: "100%",
          opacity: 0,
        });
      }
      
      tl.to(wordRef.current, {
        duration: 1,
        y: "0%",
        opacity: 1,
        ease: Power3.easeOut,
        onStart: () => {
          if (wordRef.current) {
            wordRef.current.textContent = service.name;
          }
        },
      })
        .to({}, { duration: 2.5 })
        .to(wordRef.current, {
          duration: 0.8,
          y: "-100%",
          opacity: 0,
          ease: Power3.easeIn,
        })
        .to({}, { duration: 0.7 });
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 0.5 });

    timeline.fromTo(
      '[data-animation="hero-fade-in"]',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: Power2.easeOut,
        duration: 1,
        stagger: 0.2,
      }
    );

    setTimeout(() => {
      document.querySelectorAll('[data-animation="hero-fade-in"]').forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '1';
        }
      });
    }, 3000);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] hero-section min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      {/* Main Hero Content */}
      <div className="relative pt-16 sm:pt-20">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #451842 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Decorative Gradient Orbs */}
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-[#451842]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-[#8a3d7a]/5 to-transparent rounded-full blur-3xl" />

        <section className="relative z-10 container max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 pt-2 sm:pt-4 lg:pt-6 pb-20 sm:pb-28 lg:pb-32">
          <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16 w-full">
            
            {/* Trust Badge - Elegant */}
            <div data-animation="hero-fade-in" className="opacity-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#451842]/10 to-[#8a3d7a]/10 border border-[#451842]/20 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#451842]" />
                <span className="text-xs font-bold text-gray-700 tracking-widest uppercase">Digital Excellence Since 2003</span>
              </div>
            </div>

            {/* Main Headline - Bold & Modern */}
            <div data-animation="hero-fade-in" className="opacity-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
                We Craft
                <br />
                <span className="relative inline-flex items-baseline gap-3 sm:gap-4 flex-wrap">
                  <span className="text-gray-400">Exceptional</span>
                  <span className="relative inline-block h-[1.2em] min-w-[280px] sm:min-w-[320px] lg:min-w-[400px]">
                    <span 
                      ref={wordRef}
                      className="absolute left-0 top-0 font-bold bg-gradient-to-r from-[#451842] via-[#8a3d7a] to-[#451842] bg-clip-text text-transparent"
                      style={{ 
                        transform: "translateY(100%)",
                        opacity: 0,
                      }}
                    >
                      {services[0].name}
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* Value Proposition - Refined */}
            <div data-animation="hero-fade-in" className="opacity-0 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-relaxed font-light">
                Tailored digital solutions that{" "}
                <span className="text-gray-900 font-medium">transform businesses</span> and{" "}
                <span className="text-gray-900 font-medium">drive growth</span>
              </p>
            </div>

            {/* Stats Grid - Modern Cards */}
            <div data-animation="hero-fade-in" className="opacity-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="group relative bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#451842]/20 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#451842]/0 to-[#451842]/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
                    <div className="relative">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#451842] to-[#8a3d7a] bg-clip-text text-transparent mb-1.5">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#451842]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#451842]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section - Strategic Placement */}
            <div data-animation="hero-fade-in" className="opacity-0 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg bg-gradient-to-r from-[#451842] to-[#5a1f55] text-white overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#451842]/20 transition-all duration-500 hover:scale-105"
                  aria-label="Start Your Project"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" strokeWidth={2.5} />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5a1f55] to-[#451842] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg bg-white text-gray-900 border-2 border-gray-200 hover:border-[#451842]/30 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                  aria-label="View Our Work"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
              </div>
              
              {/* Trust Note */}
              <p className="mt-6 text-sm text-gray-500 font-medium">
                ✓ Free consultation · No commitment · 24hr response time
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../shared/Navbar";
import { GetStartedSvg } from "@/components/svgs";
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
          wordRef.current.className = `relative ${word.style}`;
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
    <div className="grid grid-rows-[auto_1fr] hero-section  h-[100svh] 2xl:h-[54rem] relative">
      <Navbar />
      <div className="grid grid-cols-1 grid-rows-1">
        <Image
          priority
          alt="Hero background"
          src="/assets/hero-image.webp"
          fill
          className="object-cover col-span-full row-span-full"
        />
        <section className="relative py-14 col-span-full pt-[5rem]  row-span-full z-10 container max-w-7xl mx-auto px-5  lg:py-24 flex flex-col md:justify-center">
          <div className="grid gap-5 lg:gap-[7rem]">
            <h1
              data-animation="hero-fade-in-y"
              className="lg:text-6xl opacity-0 text-4xl font-semibold lg:font-medium tracking-tight text-accent"
            >
              Fueling Your Business <br />
              Growth through <br />
              <p className="relative gap-2 flex flex-col md:flex-row overflow-hidden md:h-[4rem]">
                Personalized
                <span
                  ref={wordRef}
                  className="relative italic playfair-display text-custom-conic-gradient"
                  style={{ display: "block", transform: "translateY(100%)" }}
                >
                  {words[0].text}
                </span>
              </p>
            </h1>
            <div className="max-w-4xl flex gap-10 items-center text-accent">
              <p
                data-animation="hero-fade-in-y"
                className="lg:text-xl opacity-0"
              >
                We fuse creativity, effective management, and a shared industry
                experience of over two decades to help you stand out in a
                competitive market
              </p>
              <Link
                href="/contact"
                className="absolute cursor-pointer transition-all duration-300 ease-out bottom-10 md:bottom-20 right-[2rem] group hover:scale-110 hover:drop-shadow-2xl active:scale-95"
              >
                <GetStartedSvg className="lg:w-[10rem] lg:h-[10rem] w-[6rem] h-[6rem] transition-transform duration-300 group-hover:rotate-12" />
              </Link>
            </div>
          </div>
        </section>
        {/* <Link
          href="/contact"
          className="md:hidden absolute left-0 right-0 mr-auto cursor-pointer transition-all z-20"
        >
          <GetStartedSvg className="w-[6rem] h-[6rem]" />
        </Link> */}
      </div>
    </div>
  );
}

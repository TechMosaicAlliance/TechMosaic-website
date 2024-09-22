"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";

// Register the TextPlugin
gsap.registerPlugin(TextPlugin);

export default function CaseStudyHero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-animation]", { y: 30, opacity: 0 });
      gsap.set(textRef.current, { opacity: 0 });

      const tl = gsap.timeline();

      tl.to("[data-animation]", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
      })
        .to(
          textRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          "-=0.5"
        )
        .to(
          textRef.current,
          {
            duration: 1.2,
            text: " see how",
            ease: "power1.in",
          },
          "-=0.9"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <div ref={heroRef}>
        <div className="grid items-center w-full text-center gap-6">
          <div className="grid gap-4">
            <p data-animation="fade-in-y" className="tracking-wider opacity-0">
              CASE STUDIES
            </p>
            <h2
              data-animation="fade-in-y"
              className="lg:text-6xl opacity-0 text-4xl lg:leading-[4.5rem] font-medium"
            >
              We bring our A
              <br /> game to every
              <br />
              project,
              {/* <span className="playfair-display italic"> see how</span> */}
              <span ref={textRef} className="playfair-display italic"></span>
            </h2>
          </div>
          <p
            data-animation="fade-in-y"
            className="text-xl opacity-0 text-center max-w-xl mx-auto"
          >
            Real success stories from our clients. Discover how top businesses
            grow with TechMosaic
          </p>
        </div>
      </div>
    </>
  );
}

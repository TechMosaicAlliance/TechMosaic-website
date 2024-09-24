"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
}

export default function Marquee({
  children,
  speed = 100,
  direction = "left",
}: MarqueeProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${v}px`);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [children]);

  useAnimationFrame((t, delta) => {
    if (!contentWidth || !containerWidth) return;

    let moveBy = (direction === "left" ? -1 : 1) * speed * (delta / 1000);

    if (direction === "left") {
      if (baseX.get() <= -contentWidth) {
        // Reset baseX to avoid delay when scrolling left
        baseX.set(baseX.get() + contentWidth);
      }
    } else {
      if (baseX.get() >= containerWidth) {
        // Reset baseX sooner to avoid delay when scrolling right
        baseX.set(baseX.get() - contentWidth);
      }
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className=" z-0 py-10 max-w-[100rem] mx-auto relative overflow-hidden"
      ref={containerRef}
    >
      <style jsx>{`
        .marquee-container {
          mask-image: linear-gradient(
            to right,
            transparent,
            black var(--fade-stop),
            black calc(100% - var(--fade-stop)),
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black var(--fade-stop),
            black calc(100% - var(--fade-stop)),
            transparent
          );
        }

        .marquee-container::before,
        .marquee-container::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: calc(var(--fade-stop) * 1.5);
          z-index: 1;
          pointer-events: none;
        }

        .marquee-container::before {
          left: 0;
          background: linear-gradient(
            to right,
            var(--fade-color),
            color-mix(in srgb, var(--fade-color) 10%, transparent)
          );
        }

        .marquee-container::after {
          right: 0;
          background: linear-gradient(
            to left,
            var(--fade-color),
            color-mix(in srgb, var(--fade-color) 10%, transparent)
          );
        }
      `}</style>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <div
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
          ref={contentRef}
          className="flex gap-4"
        >
          {children}
          {children}
        </div>
        <div className="flex gap-4">{children}</div>
      </motion.div>
    </div>
  );
}

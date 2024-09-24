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
      className=" z-0 marquee-container  py-8 max-w-[100rem] mx-auto relative overflow-hidden"
      ref={containerRef}
    >
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <div className="flex gap-4">{children}</div>
        <div ref={contentRef} className="flex gap-4">
          {children}
          {children}
          {children}
        </div>
        <div className="flex gap-4">{children}</div>
      </motion.div>
    </div>
  );
}

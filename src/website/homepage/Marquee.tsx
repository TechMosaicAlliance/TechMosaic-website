"use client";
import {
  FacebookSvg,
  GoogleSvg,
  PinterestSvg,
  TwitchSvg,
  WebFlowSvg,
  YoutubeSvg,
} from "@/components/svgs";
import React from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity?: number;
}

export default function Marquee({ baseVelocity = 4, children }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <section className="py-7">
      <div className="overflow-hidden m-0 flex-nowrap whitespace-nowrap flex">
        <motion.div style={{ x }}>
          <div className="flex gap-10">
            {children}
            {children}
            {children}
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

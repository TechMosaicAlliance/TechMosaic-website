/* eslint-disable @next/next/no-img-element */
"use client";
import { companyMarqueeData } from "@/services/dummyData";
import React from "react";
import Marquee from "./Marquee";
import { useGetLogos } from "../hooks";

export default function HomeMarque() {
  const { data, isPending } = useGetLogos();

  if (isPending) {
    return (
      <div className="flex gap-10 py-10 justify-center items-center"></div>
    );
  }

  if (data && data?.length > 4) {
    return (
      <Marquee>
        <div className="flex gap-10 justify-center items-center">
          {data.map((item, idx) => (
            <div key={idx} className="w-[280px]  h-[60px]">
              <img
                className="w-full h-full object-cover" // Ensures image covers container
                alt="l"
                src={item.acf.logo}
              />
            </div>
          ))}
        </div>
      </Marquee>
    );
  }

  return (
    <Marquee>
      <div className="flex gap-10 items-center">
        {companyMarqueeData.map((item, idx) => (
          <div key={idx}>{item.icon}</div>
        ))}
      </div>
    </Marquee>
  );
}

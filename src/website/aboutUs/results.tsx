"use client";
import React, { useEffect } from "react";
import gsap, { Power4, Power2 } from "gsap";
import { useGetContents } from "../hooks";

const data = [
  {
    icon: (val: string) => (
      <div className="flex items-center">
        <h1 data-count={val} className="text-3xl lg:text-5xl font-medium">
          {val}
        </h1>
        <p className="text-2xl lg:text-4xl font-medium text-primary">+</p>
      </div>
    ),
    text: "Happy Clients",
  },
  {
    icon: (val: string) => (
      <div className="flex items-center">
        <h1 data-count={val} className="text-3xl lg:text-5xl font-medium">
          {val}
        </h1>
        <p className="text-2xl lg:text-4xl font-medium text-primary">+</p>
      </div>
    ),
    text: "Successful projects",
  },
  {
    icon: (val: string) => (
      <div className="flex items-center">
        <h1 data-count={val} className="text-3xl lg:text-5xl font-medium">
          {val}
        </h1>
        <p className="text-2xl lg:text-4xl font-medium text-primary">+</p>
      </div>
    ),
    text: "Team members",
  },
  {
    icon: (val: string) => (
      <div className="flex items-center">
        <h1 data-count={val} className=" text-3xl lg:text-5xl font-medium">
          {val}
        </h1>
        <p className=" text-2xl lg:text-4xl font-medium text-primary">%</p>
      </div>
    ),
    text: "Customer satisfaction",
  },
];

export default function OurResults() {
  const { data: contentData, isPending } = useGetContents();

  useEffect(() => {
    if (isPending) return;
    gsap.utils.toArray("h1[data-count]").forEach((el: any) => {
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: el.getAttribute("data-count"),
          duration: 10,
          ease: "power1.out",
          snap: { innerText: 1 },
          onUpdate: () => {
            el.innerText = Math.ceil(el.innerText);
          },
        }
      );
    });
  }, [isPending]);

  if (isPending) {
    return <div></div>;
  }
  return (
    <section className="py-16 lg:py-24 bg-gray-50/50">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h1
          data-animation="fade-in-y"
          className="text-xl font-medium md:font-normal opacity-0 mb-8 lg:mb-12"
        >
          Our results in numbers
        </h1>

        <div className="flex flex-wrap gap-8 lg:gap-20 justify-center items-center">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-shrink-0  gap-1 flex-col w-fit items-center"
            >
              {item.icon(contentData?.results?.[idx] as any)}
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

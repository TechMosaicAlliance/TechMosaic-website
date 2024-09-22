"use client";
import React, { useEffect } from "react";
import Marquee from "../homepage/Marquee";
import gsap, { Power4, Power2 } from "gsap";

const data = [
  {
    icon: (
      <div className="flex items-center">
        <h1 data-count="250" className="text-3xl lg:text-5xl font-medium">
          250
        </h1>
        <p className="text-2xl lg:text-4xl font-medium text-red-500">+</p>
      </div>
    ),
    text: "Happy Clients",
  },
  {
    icon: (
      <div className="flex items-center">
        <h1 data-count="400" className="text-3xl lg:text-5xl font-medium">
          400
        </h1>
        <p className="text-2xl lg:text-4xl font-medium text-red-500">+</p>
      </div>
    ),
    text: "Successful projects",
  },
  {
    icon: (
      <div className="flex items-center">
        <h1 data-count="100" className="text-3xl lg:text-5xl font-medium">
          100
        </h1>
        <p className="text-2xl lg:text-4xl font-medium text-red-500">+</p>
      </div>
    ),
    text: "Team members",
  },
  {
    icon: (
      <div className="flex items-center">
        <h1 data-count="99" className=" text-3xl lg:text-5xl font-medium">
          99
        </h1>
        <p className=" text-2xl lg:text-4xl font-medium text-red-500">%</p>
      </div>
    ),
    text: "Customer satisfaction",
  },
];

export default function OurResults() {
  useEffect(() => {
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
  }, []);
  return (
    <section className="lg:pt-[3rem]">
      <div className=" text-center mx-auto">
        <h1 data-animation="fade-in-y" className="text-xl opacity-0">
          Our results in numbers
        </h1>

        <Marquee baseVelocity={0}>
          <div className="flex gap-20">
            {data.map((item, idx) => (
              <div
                key={idx}
                className="flex  gap-1 flex-col w-fit items-center"
              >
                {item.icon}
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

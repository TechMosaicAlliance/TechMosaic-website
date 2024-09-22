import {
  BrandDesignSvg,
  CopyWritingSvg,
  UIUXSvg,
  WebDevSvg,
} from "@/components/svgs";
import React from "react";

const data = [
  {
    name: "Graphic Design",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: (
      <BrandDesignSvg className="group-hover:rotate-90 transition-transform" />
    ),
  },
  {
    name: "Copywriting",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: (
      <CopyWritingSvg className="group-hover:rotate-6 transition-transform" />
    ),
  },
  {
    name: "UI/UX Design",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: <UIUXSvg className="group-hover:rotate-12 transition-transform" />,
  },
  {
    name: "Web Development",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: <WebDevSvg className="group-hover:rotate-90 transition-transform" />,
  },
  {
    name: "Brand Design",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: (
      <BrandDesignSvg className="group-hover:rotate-45 transition-transform" />
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section className="container border-t pt-[4rem] mx-auto">
      <div
        data-animation="trigger-fade-in-y"
        className="grid grid-cols-layout opacity-0 gap-5 "
      >
        {data.map((item, idx) => (
          <Card key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}

function Card({ item }: { item: (typeof data)[0] }) {
  return (
    <div className="bg-[#F6F5F4] cursor-pointer group  rounded  drop-shadow p-5">
      <div className="grid items-center gap-4">
        <div className="flex items-center flex-col gap-2">
          <div className="w-14   h-[3.3rem] bg-black/80 flex items-center justify-center rounded-lg">
            {item.icon}
          </div>
          <h1 className="font-medium">{item.name}</h1>
        </div>
        <p className="text-sm text-center">{item.text}</p>
      </div>
    </div>
  );
}

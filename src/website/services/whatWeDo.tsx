"use client";
import {
  BrandDesignSvg,
  CopyWritingSvg,
  UIUXSvg,
  WebDevSvg,
  ArrowRightSvg,
} from "@/components/svgs";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const data = [
  {
    name: "Graphic Design",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: (
      <BrandDesignSvg className="group-hover:rotate-90 transition-transform duration-500" />
    ),
    gradient: "from-purple-500/10 via-pink-500/10 to-orange-500/10",
    borderGradient: "from-purple-500 via-pink-500 to-orange-500",
    number: "01",
  },
  {
    name: "Copywriting",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: (
      <CopyWritingSvg className="group-hover:rotate-6 transition-transform duration-500" />
    ),
    gradient: "from-blue-500/10 via-cyan-500/10 to-teal-500/10",
    borderGradient: "from-blue-500 via-cyan-500 to-teal-500",
    number: "02",
  },
  {
    name: "UI/UX Design",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: <UIUXSvg className="group-hover:rotate-12 transition-transform duration-500" />,
    gradient: "from-indigo-500/10 via-purple-500/10 to-pink-500/10",
    borderGradient: "from-indigo-500 via-purple-500 to-pink-500",
    number: "03",
  },
  {
    name: "Web Development",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: <WebDevSvg className="group-hover:rotate-90 transition-transform duration-500" />,
    gradient: "from-emerald-500/10 via-green-500/10 to-lime-500/10",
    borderGradient: "from-emerald-500 via-green-500 to-lime-500",
    number: "04",
  },
  {
    name: "Brand Design",
    text: "We combine the best creative and tech talents to deliver faster, more affordable, and reliable solutions.",
    icon: (
      <BrandDesignSvg className="group-hover:rotate-45 transition-transform duration-500" />
    ),
    gradient: "from-amber-500/10 via-yellow-500/10 to-orange-500/10",
    borderGradient: "from-amber-500 via-yellow-500 to-orange-500",
    number: "05",
  },
];

export default function WhatWeDo() {
  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
      {/* Header */}
      <div className="mb-10 sm:mb-12 lg:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-[2px] bg-primary rounded-full" />
          <h3 className="tracking-[0.15em] font-semibold text-xs sm:text-sm uppercase text-primary">
            WHAT WE DO
          </h3>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-neutral-900 playfair-display max-w-3xl">
          Explore Our Creative Services
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl">
          Click on any service to view our portfolio of work in that area
        </p>
      </div>

      {/* Creative Grid Layout */}
      <div
        data-animation="trigger-fade-in-y"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 opacity-0 gap-4 sm:gap-6 lg:gap-8"
      >
        {data.map((item, idx) => (
          <Card key={idx} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}

function Card({ item, index }: { item: (typeof data)[0]; index: number }) {
  return (
    <Link 
      href={`/portfolio?service=${encodeURIComponent(item.name)}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2",
        "border-gray-200/50 hover:border-primary/50",
        "bg-gradient-to-br bg-[#F6F5F4] hover:bg-white",
        "transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10",
        "cursor-pointer h-full"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >

      {/* Background Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          item.gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-5 sm:p-6 lg:p-8 h-full flex flex-col">
        {/* Number Badge */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-black/80 group-hover:bg-primary transition-colors duration-300 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm sm:text-base">{item.number}</span>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-0">
            <ArrowRightSvg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
        </div>

        {/* Icon */}
        <div className="mb-4 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-black/80 group-hover:bg-primary transition-all duration-300 flex items-center justify-center rounded-xl group-hover:scale-110 group-hover:rotate-3 shadow-lg">
            <div className="text-white scale-75 sm:scale-90 lg:scale-100">
              {item.icon}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-neutral-900 group-hover:text-primary transition-colors duration-300">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-grow">
          {item.text}
        </p>

        {/* Hover Indicator */}
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200/50 group-hover:border-primary/30 transition-colors duration-300">
          <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-primary transition-colors duration-300">
            View Portfolio →
          </span>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className={cn(
            "absolute top-0 right-0 w-full h-full bg-gradient-to-br rounded-bl-full",
            item.gradient
          )}
        />
      </div>
    </Link>
  );
}

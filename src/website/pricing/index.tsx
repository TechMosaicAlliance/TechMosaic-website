"use client";
import { ArrowRightSvg } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, { useState } from "react";
import Faq from "../shared/Faq";
import { useHeroAnimation } from "../animations";
import Link from "next/link";

const data = [
  {
    for: "For Individuals",
    type: "Silver",
    text: "   Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.",
    price: "2500",
    duration: "monthly",
    features: [
      "Email Marketing",
      "Paid Advertising",
      "SEO & SEM",
      "Normal Support",
    ],
  },
  {
    for: "For Startups",
    type: "Gold",
    text: "   Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.",
    price: "5000",
    duration: "monthly",
    features: [
      "All in Silver Plan",
      "Advanced Analytics",
      "Content Marketing",
      "Premium Support",
    ],
  },
  {
    for: "For Enterprises",
    type: "Platinum",
    text: "Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.",
    price: "8000",
    duration: "monthly",
    features: [
      "All in Gold plan",
      "Funnel Optimization",
      "Custom market planning",
      "Dedicated Support ",
    ],
  },
];

export default function PricingView() {
  const [selected, setSelected] = useState(1);
  useHeroAnimation();
  const [isMohtly] = useState(true);
  return (
    <div>
      <div className="container max-w-7xl p-4 gap-10  pt-[5rem] mx-auto">
        <div className="">
          <div className="grid gap-4">
            <div className="grid gap-4">
              <p
                data-animation="fade-in-y"
                className="tracking-wider opacity-0"
              >
                PRICING
              </p>
              <h2
                data-animation="fade-in-y"
                className="lg:text-6xl opacity-0 text-4xl max-w-3xl lg:leading-[4.5rem] font-medium"
              >
                Pricing plans for
                <br />
                <span className="playfair-display italic">every need</span>
              </h2>
            </div>
            <p
              data-animation="fade-in-y"
              className="lg:text-xl opacity-0 text-lg max-w-2xl"
            >
              We&apos;ve curated a range of flexible plans designed to cater to
              diverse business needs. Whether you&apos;re a budding startup or a
              thriving enterprise.
            </p>
          </div>
        </div>

        <section className=" max-w-7xl  grid lg:grid-cols-3 gap-7 pt-[4rem]">
          {data.map((item, idx) => (
            <PricingCard
              selected={selected}
              handleSelect={() => setSelected(idx)}
              index={idx}
              isMonthly={isMohtly}
              key={idx}
              item={item}
            />
          ))}
        </section>

        <div className="max-w-2xl pt-[4rem] grid gap-4  mx-auto">
          <div className="grid lg:text-center gap-4">
            <div className="grid gap-4">
              <h2
                data-animation="trigger-fade-in-y"
                className="lg:text-4xl opacity-0 text-2xl tracking-tight font-medium"
              >
                Looking for a custom marketing package or campaign?
              </h2>
            </div>
            <p
              data-animation="trigger-fade-in-y"
              className="lg:text-xl opacity-0 text-lg "
            >
              Let&apos;s tailor a marketing package or campaign that suits your
              unique goals and amplifies your brand&apos;s impact
            </p>
          </div>

          <Link className="mx-auto" href="/contact">
            <Button className="w-fit lg:mx-auto bg-black hover:bg-black/90">
              CONTACT US
              <ArrowRightSvg className="ml-2" />
            </Button>
          </Link>
        </div>
        {/* <section className="p-[4rem] mt-[10rem] bg-[#EEEDEB]  max-w-6xl mx-auto"></section> */}
        <section className="lg:pt-[10rem] pt-[4rem]  max-w-5xl mx-auto">
          <Faq />
        </section>
      </div>
    </div>
  );
}

function PricingCard({
  item,
  isMonthly = true,
  index,
  handleSelect,
  selected,
}: {
  isMonthly: boolean;
  item: (typeof data)[0];
  index: number;
  selected: number;
  handleSelect: () => void;
}) {
  return (
    <section
      onClick={handleSelect}
      data-animation="fade-in-y"
      className={cn(
        index === selected ? "bg-custom-conic-gradient text-white" : "",
        "shadow drop-shadow cursor-pointer opacity-0 p-10 w-fit"
      )}
    >
      <div className="grid gap-1">
        <span className="text-sm">{item.for}</span>
        <h1 className="font-semibold text-2xl">{item.type}</h1>
      </div>
      <div className="py-1 max-w-sm">
        <p>{item.text}</p>
      </div>
      <div className="flex py-4 items-end gap-1">
        <h1 className="text-4xl font-bold">
          ${isMonthly ? item.price : Number(item.price) * 12}
        </h1>
        <span>/{isMonthly ? "Monthly" : "yearly"}</span>
      </div>
      <div className="grid gap-3">
        <h2 className="font-medium">What&apos;s included</h2>
        <div className="grid gap-2">
          {item.features.map((res, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className={cn(
                  index === selected
                    ? "bg-white text-black"
                    : "bg-custom-conic-gradient text-white",
                  "w-6 flex items-center justify-center h-6 border"
                )}
              >
                <Check size={14} />
              </div>
              <p>{res}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 w-full">
        <Button
          className={cn(
            index === selected
              ? "bg-white text-black  stroke-black hover:bg-white"
              : "bg-black hover:bg-black/90",
            "w-full rounded-none"
          )}
        >
          Get Started
          <ArrowRightSvg
            className={cn(index === 1 ? "stroke-black" : "", "ml-2")}
          />
        </Button>
      </div>
    </section>
  );
}

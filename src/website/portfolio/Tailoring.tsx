import { FiveSvg, FourSvg, OneSvg, ThreeSvg, TwoSvg } from "@/components/svgs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const data = [
  {
    name: "Graphic Design",
    text: "Unique and creative designs to create awareness and boost your growth",
    url: <OneSvg />,
  },
  {
    name: "Copywriting",
    text: "The perfect blend of marketing psychology and creativity to tell your story and win over your target audience",
    url: <TwoSvg />,
  },
  {
    name: "Web Development",
    text: "Responsive, secure, and scalable websites that converts",
    url: <ThreeSvg />,
  },
  {
    name: "Brand Design",
    text: "Differentiate your brand with unique brand identity designs",
    url: <FourSvg />,
  },
  {
    name: "UI/UX Design",
    text: "Unique and seamless experience for your users",
    url: <FiveSvg />,
  },
];

export default function TailoringView() {
  return (
    <section className="pt-[12rem] ">
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between lg:items-center ">
        <div className="grid gap-4">
          <p data-animation="trigger-fade-in-y" className="">
            Services
          </p>
          <h1
            data-animation="trigger-fade-in-y"
            className="lg:text-6xl  text-3xl tracking-tight"
          >
            Tailored services
            <br /> for
            <span className="playfair-display italic"> your growth</span>
          </h1>
        </div>
        <div className="max-w-lg mb-2">
          <p
            data-animation="trigger-fade-in-y"
            className="text-sm lg:text-base"
          >
            Your one stop shop for everything creativity
          </p>
        </div>
      </div>

      <div className="bg-white grid  mt-8 p-7 lg:p-8 lg:rounded-xl">
        {data.map((item, idx) => (
          <div
            data-animation="trigger-fade-in-y"
            key={idx}
            className="lg:grid-cols-[100px_minmax(900px,_1fr)_100px]  flex lg:grid border-b last-of-type:border-0 py-7 gap-10 lg:gap-[4rem] lg:items-center"
          >
            {item.url}

            <div className="flex flex-col  gap-4 lg:flex-row lg:gap-20 lg:items-center">
              <div className="max-w-sm grid  gap-2 lg:gap-0 ">
                <h1 className="font-medium text-xl">{item.name}</h1>
                <p className="text-xs lg:text-base">{item.text}</p>
              </div>
              <div>
                <Link
                  className="text-sm font-medium flex items-center"
                  href="/contact"
                >
                  Get in touch
                  <ArrowRight className="ml-1" size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

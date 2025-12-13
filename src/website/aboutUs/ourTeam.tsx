"use client";
import { BlurImage } from "@/components/ui/blurImage";
import React from "react";
import { useGetTeams } from "../hooks";
const data = [
  {
    name: "Wade Warren",
    url: "/assets/ceo.jpg",
    role: "CEO & Founder",
  },
  {
    name: "Wade Warren",
    url: "/assets/ceo.jpg",
    role: "CEO & Founder",
  },
  {
    name: "Wade Warren",
    url: "/assets/ceo.jpg",
    role: "CEO & Founder",
  },
];
export default function OurTeamView() {
  const { data } = useGetTeams();

  return (
    <>
      {data && data.length > 0 ? (
        <section className="container max-w-7xl p-4 py-16 lg:py-24 mx-auto">
          <div className="grid gap-3 mb-12 lg:mb-16">
            <p className="tracking-wider text-sm lg:text-base">OUR TEAM</p>
            <h2 className="lg:text-5xl text-4xl lg:leading-[3.5rem] font-medium">
              Humans of
              <br className="hidden lg:block" /> TechMosaic
            </h2>
          </div>
          <div>
            <div className="grid lg:grid-cols-3 gap-4">
              {data.map((item, idx) => (
                <article key={idx} className="flex flex-col ">
                  <div className=" min-h-[26rem] overflow-hidden relative w-full">
                    <BlurImage
                      className="object-cover"
                      fill
                      alt={item?.acf?.name}
                      src={item?.acf?.image}
                    />
                  </div>
                  <div className="border p-10 flex justify-center h-full ">
                    <div className="text-center grid gap-2">
                      <h1 className="text-2xl line-clamp-3 font-medium">
                        {item.acf.name}
                      </h1>
                      <p>{item.acf.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

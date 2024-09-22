"use client";
import React from "react";
import { BlurImage } from "@/components/ui/blurImage";
import { useGetTestimonials } from "../hooks";
const data = [
  {
    name: "Noah Jones",
    text: " We were tasked with creating a brand identity that shows how NarksEnergy is redefining Nigeria's energy sector through innovation, leadership, and sustainability.",
    url: "/assets/avatar1.jpg",
    role: "Marketing Sepecialist",
  },
  {
    name: "Praise Obaje",
    text: " We were tasked with creating a brand identity that shows how NarksEnergy is redefining Nigeria's energy sector through innovation, leadership, and sustainability.",
    url: "/assets/avatar1.jpg",
    role: "Marketing Sepecialist",
  },
  {
    name: "Lydia Knowles",
    text: " We were tasked with creating a brand identity that shows how NarksEnergy is redefining Nigeria's energy sector through innovation, leadership, and sustainability.",
    url: "/assets/avatar1.jpg",
    role: "Marketing Sepecialist",
  },
];

export default function TestimonialView() {
  const { data } = useGetTestimonials();
  return (
    <>
      {data && data.length > 0 ? (
        <section
          id="testimonial"
          className="container max-w-7xl p-4 pt-[4rem] lg:pt-[7rem]"
        >
          <div className="flex items-end justify-between">
            <div className="grid gap-4">
              <h3 className="tracking-wider">TESTIMONIALS</h3>
              <h1 className="lg:text-5xl text-3xl">
                What our clients
                <br /> have to say...
              </h1>
            </div>
          </div>

          <div className="lg:pt-[4rem] pt-[2rem]">
            <div className="grid lg:grid-cols-3 gap-4">
              {data.map((item, idx) => (
                <article
                  key={idx}
                  className="flex flex-col rounded-lg items-center justify-center text-center bg-white gap-2 p-7 py-14"
                >
                  <div className="w-20 h-20 overflow-hidden relative rounded-full">
                    <BlurImage
                      className="object-cover w-full h-full"
                      fill
                      alt={item?.acf?.name}
                      src={item.acf.image}
                    />
                  </div>
                  <div className="pt-3">
                    <p className="line-clamp-4 tracking-tight">
                      {item.acf.text}
                    </p>
                  </div>
                  <div className="pt-3">
                    <h1 className="font-medium">{item.acf.name}</h1>
                    <p className="text-sm">{item.acf.role}</p>
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

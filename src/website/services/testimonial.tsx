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
          className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20"
        >
          <div className="flex items-end justify-between mb-8 sm:mb-12 lg:mb-16">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="tracking-[0.15em] font-semibold text-xs sm:text-sm uppercase text-primary">
                TESTIMONIALS
              </h3>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 playfair-display">
                What our clients
                <br /> have to say...
              </h1>
            </div>
          </div>

          <div className="pt-8 sm:pt-12 lg:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {data.map((item, idx) => (
                <article
                  key={idx}
                  className="flex flex-col rounded-xl lg:rounded-2xl items-center justify-center text-center bg-white gap-4 sm:gap-5 p-6 sm:p-8 lg:p-10 py-10 sm:py-12 lg:py-16 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden relative rounded-full ring-4 ring-gray-100">
                    <BlurImage
                      className="object-cover w-full h-full"
                      fill
                      alt={item?.acf?.name}
                      src={item.acf.image}
                    />
                  </div>
                  <div className="pt-2 sm:pt-3">
                    <p className="text-sm sm:text-base leading-relaxed text-gray-700 line-clamp-4">
                      {item.acf.text}
                    </p>
                  </div>
                  <div className="pt-2 sm:pt-3">
                    <h1 className="font-semibold text-gray-900 text-base sm:text-lg">{item.acf.name}</h1>
                    <p className="text-sm sm:text-base text-gray-600">{item.acf.role}</p>
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

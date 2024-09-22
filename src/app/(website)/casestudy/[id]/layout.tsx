import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Case Studies | Real-World Impact of Our Design Services",
  description:
    "Explore real-world examples of how our personalized design services have fueled business growth for our clients. Discover the impact of our creative solutions.",
  keywords:
    "case studies, success stories, business growth examples, design impact, client testimonials",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container max-w-7xl p-4 gap-10 pt-4  md:pt-[5rem] mx-auto">
      {children}
    </section>
  );
}

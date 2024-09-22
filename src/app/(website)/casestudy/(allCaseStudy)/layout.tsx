import { BlogHero } from "@/website/blog/blogHero";
import CaseStudyHero from "@/website/caseStudy";
import Filter from "@/website/shared/Filter";
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
    <section className="container max-w-7xl p-4 pt-[5rem] mx-auto">
      <CaseStudyHero />
      <div className="pt-[4rem]">
        <Filter url="/casestudy" />
      </div>
      {children}
    </section>
  );
}

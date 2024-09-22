import { wordpressApi } from "@/services/wordpress";
import { SingleCaseStudy } from "@/website/caseStudy/singleCaseStudy";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Case Studies | Real-World Impact of Our Design Services",
  description:
    "Explore real-world examples of how our personalized design services have fueled business growth for our clients. Discover the impact of our creative solutions.",
  keywords:
    "case studies, success stories, business growth examples, design impact, client testimonials",
};

export default async function page({ params }: any) {
  const paramsId = params.id;
  const data = await wordpressApi.casestudy.getById(paramsId);
  return <SingleCaseStudy data={data} />;
}

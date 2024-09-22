import { CardLoader } from "@/components/ui/loading";
import { wordpressApi } from "@/services/wordpress";
import CaseStudyView from "@/website/caseStudy";
import CaseStudyList from "@/website/caseStudy/CaseStudyList";
import { Metadata } from "next";
import React, { Suspense } from "react";
export const metadata: Metadata = {
  title: "Case Studies | Real-World Impact of Our Design Services",
  description:
    "Explore real-world examples of how our personalized design services have fueled business growth for our clients. Discover the impact of our creative solutions.",
  keywords:
    "case studies, success stories, business growth examples, design impact, client testimonials",
};
export default async function page() {
  const data = await wordpressApi.casestudy.getAll();
  return (
    <Suspense fallback={<CardLoader />}>
      <CaseStudyList data={data} />
    </Suspense>
  );
}

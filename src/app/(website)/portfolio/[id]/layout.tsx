import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Portfolio | Creative Solutions for Business Growth",
  description:
    "View our diverse portfolio of personalized design projects. See how we've helped businesses stand out in competitive markets through creative and effective solutions.",
  keywords:
    "design portfolio, creative projects, business growth showcase, market differentiation, visual examples",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container max-w-7xl p-4 gap-10  pt-4  md:pt-[5rem] mx-auto">
      {children}
    </section>
  );
}

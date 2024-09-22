import { BlogHero } from "@/website/blog/blogHero";
import Filter from "@/website/shared/Filter";
import { TermHero } from "@/website/terms/termsHero";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms ",
  description: "Our Terms of service",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container max-w-5xl p-4 pt-[5rem] mx-auto">
      <TermHero />
      {children}
    </section>
  );
}

import { BlogHero } from "@/website/blog/blogHero";
import Filter from "@/website/shared/Filter";
import Footer from "@/website/shared/Footer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blog | Insights on Design and Business Growth",
  description:
    "Stay updated with the latest trends in personalized design, business growth strategies, and creative management. Insights from our experienced team to fuel your success.",
  keywords:
    "design blog, business growth tips, creative management, industry insights, tech trends",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container max-w-7xl p-4 pt-[5rem] mx-auto">
      <BlogHero />
      <div className="pt-[4rem]">
        <Filter url="/blogs" />
      </div>
      {children}
    </section>
  );
}

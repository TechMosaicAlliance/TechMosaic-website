import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Single blogs",
  description:
    "Explore the groundbreaking projects powered by TechMosaic, showcasing its remarkable capabilities and transformative diverse industries.",
  twitter: {
    images: "",
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container max-w-7xl p-4 gap-10 pt-4  md:pt-[5rem] mx-auto">
      {children}
    </section>
  );
}

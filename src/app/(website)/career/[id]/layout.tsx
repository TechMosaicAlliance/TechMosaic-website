import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Single Career",
  description: "Explore our Career page, showcasing our open roles",
  twitter: {
    images: "",
  },
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <section className="">{children}</section>;
}

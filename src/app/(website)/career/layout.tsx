import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Career",
  description: "Explore our Career page, showcasing our open roles",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}

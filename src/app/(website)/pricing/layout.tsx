import Footer from "@/website/shared/Footer";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pricing | Our Pricing",
  description:
    "We've curated a range of flexible plans designed to cater to diverse business needs. Whether you're a budding startup or a thriving enterprise.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}

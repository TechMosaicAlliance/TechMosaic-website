import AboutUsView from "@/website/aboutUs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us | Experienced Tech Firm Driving Business Growth",
  description:
    "Meet the team behind our tech firm with over two decades of shared industry experience. Learn how we blend creativity and effective management to drive business growth.",
  keywords:
    "tech firm, experienced team, creative professionals, business growth experts, industry veterans",
};

export default function page() {
  return <AboutUsView />;
}

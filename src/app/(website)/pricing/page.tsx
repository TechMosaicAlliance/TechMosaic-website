import PricingView from "@/website/pricing";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Fueling Your Business Growth through Personalized",
};

export default function page() {
  return <PricingView />;
}

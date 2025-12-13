import ServicePage from "@/website/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do | Fueling Business Growth Through Personalized Design",
  description:
    "Boost your business with our personalized design services. We combine creativity, expert management, and 20+ years of industry experience to help you stand out in the market.",
  keywords:
    "personalized design, business growth, creative services, tech firm, industry experience, competitive advantage",
};

export default function page() {
  return <ServicePage />;
}

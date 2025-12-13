"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightSvg } from "@/components/svgs";

export function NewsletterButton() {
  const scrollToNewsletter = () => {
    const newsletterElement = document.getElementById("newsletter-section");
    newsletterElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Button 
      onClick={scrollToNewsletter}
      className="border-white group mt-7 w-fit border"
    >
      SUBSCRIBE TO OUR NEWSLETTER
      <ArrowRightSvg className="ml-1 h-4 w-4  transition-transform group-hover:translate-x-1" />
    </Button>
  );
}


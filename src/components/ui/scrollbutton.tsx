"use client";

import { useState, useEffect } from "react";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          className="fixed z-[999999] bottom-4 right-4 border p-2 rounded shadow-lg transition-opacity duration-300"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}

export function ScrollHack() {
  // when clicking a link, user will not scroll to the top of the page if the header is sticky.
  // their current scroll position will persist to the next page.
  // this useEffect is a workaround to 'fix' that behavior.

  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return <></>;
}

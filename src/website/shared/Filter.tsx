"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const filters = ["ALL", "MOTION GRAPHIC", "ILLUSTRATION", "GRAPHIC DESIGN"];

export default function Filter({ url }: { url: string }) {
  const pathname = usePathname();

  const isBasePath = pathname === url || pathname === `${url}/`;

  return (
    <div className="flex flex-wrap gap-3 pb-2">
      {filters.map((item, idx) => {
        const isActive =
          (item === "ALL" && isBasePath) ||
          pathname.endsWith(encodeURIComponent(item));

        return (
          <Link
            href={item === "ALL" ? url : `${url}/category/${item}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 border-2 whitespace-nowrap",
              }),
              isActive
                ? "bg-primary text-white border-primary hover:bg-primary/90 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5"
            )}
            key={idx}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}

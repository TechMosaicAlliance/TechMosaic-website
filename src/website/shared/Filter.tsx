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
    <div className="flex flex-wrap items-center gap-3">
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
                  "rounded-full px-6 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 border whitespace-nowrap uppercase",
              }),
              isActive
                ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800 shadow-lg scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50"
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

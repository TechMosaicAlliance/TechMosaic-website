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
    <div className="flex bar overflow-x-auto gap-2 md:p-4">
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
                  "rounded-md hover:bg-black focus:active:bg-black focus:active:text-white hover:text-white border-gray-300 text-sm font-medium",
              }),
              isActive
                ? "bg-black text-primary-foreground"
                : "lg:hover:bg-secondary"
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

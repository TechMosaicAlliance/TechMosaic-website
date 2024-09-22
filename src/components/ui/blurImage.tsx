"use client";

import cn from "clsx";
import Image from "next/image";
import { useState } from "react";

import type { ComponentProps } from "react";

export function BlurImage({
  preview,
  ...props
}: ComponentProps<typeof Image> & { preview?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleToggleModal = () => {
    if (!preview) return;
    if (!isLoading) {
      setOpen(!open);
    }
  };

  return (
    <>
      <Image
        {...props}
        onClick={handleToggleModal}
        alt={props.alt}
        className={cn(
          props.className,
          "duration-700 ease-in-out cursor-zoom-in",
          isLoading ? "scale-105 blur-lg" : "scale-100  blur-0"
        )}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}

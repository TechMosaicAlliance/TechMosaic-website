"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackBtn() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="border-black rounded-none h-[3.5rem]"
      variant="outline"
    >
      <ArrowLeft />
    </Button>
  );
}

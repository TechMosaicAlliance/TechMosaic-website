"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLinkedin } from "../hooks";

export default function LinkedInShare() {
  const [showInput, setShowInput] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const { mutate, isPending } = useLinkedin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        acf: {
          url: linkedinUrl,
        },
      },
      {
        onSuccess() {
          setLinkedinUrl("");
          setShowInput(false);
        },
      }
    );
  };

  return (
    <div className="">
      <Button
        onClick={() => setShowInput(!showInput)}
        className="rounded-full border-black"
        variant="outline"
      >
        Share Your Linkedin Profile
      </Button>

      {showInput && (
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <input
            type="url"
            className=" h-[2.2rem] px-2 ring-1 ring-black/60 placeholder:text-sm  rounded focus:outline-none focus:ring-black/30 bg-transparent outline-none w-full"
            placeholder="Enter your LinkedIn profile URL"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            required
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}

"use client"; // Error components must be Client Components

import { ErrorCard } from "@/components/ui/cards";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-5xl p-20 mx-auto">
      <ErrorCard
        text="Kindly check your query and click on the button below to try again."
        handleReset={() => reset()}
      />
    </div>
  );
}

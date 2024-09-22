import { AlertTriangle } from "lucide-react";
import { Button } from "../button";

export function ErrorCard({
  text,
  handleReset,
}: {
  text: string;
  handleReset: () => void;
}) {
  return (
    <div className="p-4 bg-[#FFF5FA] border border-[#D5DBE1] rounded-xl">
      <div className="flex gap-2 ">
        <AlertTriangle className="w-4 text-[#B3093C]" />
        <article className="grid gap-2">
          <h2 className="text-[#B3093C] leading-6 text-sm">Error occured!</h2>
          <p className=" text-zinc-600">{text}</p>
          <Button
            size="sm"
            variant="destructive"
            className="w-fit"
            onClick={
              // Attempt to recover by trying to re-render the segment
              handleReset
            }
          >
            Try again
          </Button>
        </article>
      </div>
    </div>
  );
}

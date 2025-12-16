"use client";
import React from "react";
import YoutubeView from "../shared/Youtube";
import { useGetContents } from "../hooks";

export default function ServiceYoutube() {
  const { data: contentData, isPending } = useGetContents();

  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[20rem] sm:h-[28rem] lg:h-[32rem] xl:h-[36rem] rounded-3xl overflow-hidden">
          <YoutubeView
            thumbnail={
              contentData?.otherContent.acf?.["service-preview"] ||
              "/assets/video_preview.jpg"
            }
            videoSrc={
              contentData?.otherContent.acf["service-video"] || "/assets/video1.mp4"
            }
          />
        </div>
      </div>
    </section>
  );
}

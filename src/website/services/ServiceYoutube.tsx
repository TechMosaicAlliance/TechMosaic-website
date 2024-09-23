"use client";
import React from "react";
import YoutubeView from "../shared/Youtube";
import { useGetContents } from "../hooks";

export default function ServiceYoutube() {
  const { data: contentData, isPending } = useGetContents();
  return (
    <YoutubeView
      videoSrc={
        contentData?.otherContent.acf["service-video"] || "/assets/video1.mp4"
      }
    />
  );
}

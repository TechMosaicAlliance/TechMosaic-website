"use client";
import React from "react";
import YoutubeView from "../shared/Youtube";
import { useGetContents } from "../hooks";

export default function InsideMosaicCompany() {
  const { data: contentData, isPending } = useGetContents();
  return (
    <section className="container max-w-7xl p-4 py-16 lg:py-24 mx-auto">
      <div className="grid ">
        <p
          data-animation="trigger-fade-in-y"
          className="tracking-wider opacity-0"
        >
          ABOUT OUR COMPANY
        </p>
        <h2
          data-animation="trigger-fade-in-y"
          className="lg:text-5xl opacity-0 text-4xl leading-[4rem] lg:leading-[5rem] font-medium"
        >
          Inside
          <span className="playfair-display italic"> TechMosaic</span>
        </h2>
      </div>
      <div
        data-animation="trigger-fade-in-y"
        className="lg:pt-12 opacity-0 pt-8"
      >
        <YoutubeView
          videoSrc={
            contentData?.otherContent.acf["inside-mosaic-video"] ||
            "/assets/video1.mp4"
          }
          thumbnail={
            contentData?.otherContent.acf?.["inside-mosaic-preview"] ||
            "/assets/office.jpg"
          }
        />
      </div>
    </section>
  );
}

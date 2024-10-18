"use client";
import React from "react";
import { useGetContents } from "../hooks";

export default function WhatNext() {
  const { data } = useGetContents();
  return (
    <section className="pt-[5rem] grid gap-10">
      <div className="">
        <h1 className="text-3xl font-medium">So What next ?</h1>
        <p>{data?.otherContent?.acf?.jobwhatnext}</p>
      </div>

      <div className="">
        <h1 className="text-3xl font-medium">We are TechMosaic</h1>
        <p>{data?.otherContent?.acf?.job_we_are}</p>
      </div>
    </section>
  );
}

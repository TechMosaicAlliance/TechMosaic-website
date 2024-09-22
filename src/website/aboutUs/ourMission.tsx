import { ArrowRightSvg } from "@/components/svgs";
import { BlurImage } from "@/components/ui/blurImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

export default function OurMission() {
  return (
    <section className="pb-14 grid gap-10 p-4 max-w-7xl container mx-auto pt-[4rem]">
      <div className=" flex-col lg:flex-row items-center gap-10 justify-between flex ">
        <div className="grid gap-4">
          <div
            data-animation="trigger-fade-in-y"
            className="grid opacity-0 gap-4"
          >
            <p>OUR PLEDGE</p>
            <h2 className="lg:text-6xl text-3xl lg:leading-[4.5rem] font-medium">
              A Pledge We Never
              <br />
              <span className="">Break</span>
            </h2>
          </div>
          <div
            data-animation="trigger-fade-in-y"
            className="lg:text-xl text-lg opacity-0 max-w-2xl"
          >
            <p>
              At TechMosaic, we go beyond mere promises -
              <span className="font-medium">
                {" "}
                we pledge our reputation on every project.
              </span>
            </p>
            <br />
            <p>
              Our commitment to quality extends to a bold promise: We&apos;ll
              never deliver solutions that we wouldn&apos;t happily accept if we
              were paying for the solution ourselves.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden  max-w-lg w-full h-[25rem] lg:h-[35rem]">
          <BlurImage
            alt=""
            src="/assets/champion.jpg"
            fill
            className=" object-cover aspect-auto"
          />
        </div>
      </div>

      <div className=" items-center flex-col lg:flex-row gap-10 justify-between flex ">
        <div
          data-animation="fade-in-y"
          className="relative overflow-hidden opacity-0  max-w-lg w-full h-[25rem] lg:h-[35rem]"
        >
          <BlurImage
            alt=""
            src="/assets/story.jpg"
            fill
            className=" object-cover aspect-auto"
          />
        </div>
        <div className="grid gap-4">
          <div
            data-animation="trigger-fade-in-y"
            className="grid opacity-0 gap-4"
          >
            <p>OUR STORY</p>
            <h2 className="lg:text-6xl text-3xl lg:leading-[4.5rem] font-medium">
              A Journey of
              <br />
              <span className="">Collaboration: Our</span>
              <br />
              <span className=" italic playfair-display ">
                Story with Startups
              </span>
            </h2>
          </div>
          <p
            data-animation="trigger-fade-in-y"
            className="lg:text-xl opacity-0 text-lg max-w-2xl"
          >
            At Techmosaic, our story is one of seamless integration and shared
            aspirations. We&apos;re more than just a digital marketing agency;
            we&apos;re your devoted partners, seamlessly integrating into your
            vision and becoming an extension of your marketing team.
          </p>

          <Link href="/career">
            <Button className="border-white group  mt-3 w-fit border">
              JOIN OUR TEAM
              <ArrowRightSvg className="ml-1 h-4 w-4  transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

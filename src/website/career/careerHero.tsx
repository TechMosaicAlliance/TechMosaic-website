import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function CareerHero() {
  return (
    <div className="relative w-full flex  items-center md:h-[34rem] ">
      <Image
        alt=""
        src="/assets/get-to-know.jpg"
        fill
        className="object-cover absolute "
      />
      <div className="relative bg-primary lg:mt-[4rem] px-4 py-20 md:p-20 max-w-5xl w-full flex justify-center md:text-center gap-10  mx-auto z-20 ">
        <div className="grid h-fit gap-4">
          <div className="grid gap-4 text-white">
            <h2 className="md:text-5xl text-4xl md:text-center md:leading-[4rem] font-medium">
              Get To Know Our Team
            </h2>
          </div>
          <p className="md:text-xl md:text-center text-lg text-white max-w-2xl">
            Discover rewarding career paths across various field, where your
            skill and talent are valued, nurtured and celebrated.
          </p>
          <Link href="/career">
            <Button className="w-fit md:mx-auto border-white border hover:bg-white bg-white text-black ">
              JOIN OUR TEAM
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

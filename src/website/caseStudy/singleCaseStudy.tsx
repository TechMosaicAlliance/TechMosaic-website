import { BlurImage } from "@/components/ui/blurImage";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  IWordPressReturnTypeObj,
  PortfolioAcf,
} from "@/services/wordpress/types";
import React from "react";
import { MarkDownComponents } from "../shared/mdFmt";
import { Button } from "@/components/ui/button";
import { ArrowRightSvg } from "@/components/svgs";
import BackBtn from "../shared/Back";
import Link from "next/link";

export function SingleCaseStudy({
  data,
}: {
  data: IWordPressReturnTypeObj<PortfolioAcf>;
}) {
  return (
    <>
      <div>
        <BackBtn />
        <div className="grid pt-10 gap-4">
          <div className="grid lg:gap-4">
            <p className="tracking-wider">Author</p>
            <h2 className="lg:text-7xl text-3xl max-w-3xl lg:leading-[5rem] font-medium">
              {data.title.rendered}
            </h2>
          </div>
          <p className="lg:text-xl text-lg max-w-2xl">
            <span className="font-medium">Project Goal - </span>

            {data?.acf.text}
          </p>
        </div>
        <div>
          <section className="border-b border-black/60">
            <div className="relative  overflow-hidden mt-12 h-[18rem] lg:h-[34rem] w-full">
              <BlurImage
                alt={data.title?.rendered}
                fill
                src={data.acf.thumbnail}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 lg:flex-row py-[1.5rem] justify-between lg:gap-10">
              <div>
                <h1 className="text-sm">SERVICES</h1>
                <p className="font-medium">
                  {data?.acf.services.split(",").map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </p>
              </div>
              <div>
                <h1 className="text-sm">COMPANY</h1>
                <p className="font-medium">{data?.acf?.companyname}</p>
              </div>
              <div className="">
                <h1 className="text-sm">WEBSITE</h1>
                {data?.acf?.website ? (
                  <p className="font-medium">{data?.acf?.website}</p>
                ) : (
                  <p className="font-medium text-center">---</p>
                )}
              </div>
              <div>
                <h1 className="text-sm">PROJECT TIMELINE</h1>
                <p className="font-medium">{data?.acf?.timeline || "-"}</p>
              </div>
              <div>
                <h1 className="text-sm">INCREASED SIGN UP RATE</h1>
                <p className="font-medium">{data?.acf?.signuprate || "-"}</p>
              </div>
            </div>
          </section>

          {/* CMS CONTENT */}
          <section className="pt-[4rem] prose max-w-5xl mx-auto">
            <MDXRemote
              source={data.acf.content}
              components={MarkDownComponents}
            />

            <Link href="/career">
              <Button className="border-white mt-7 w-fit border">
                JOIN OUR TEAM
                <ArrowRightSvg className="ml-2 " />
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

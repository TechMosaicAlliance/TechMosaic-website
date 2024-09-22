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

export function SinglePortfolio({
  data,
}: {
  data: IWordPressReturnTypeObj<PortfolioAcf>;
}) {
  console.log(data, "dd");
  return (
    <>
      <div>
        <BackBtn />
        <div className="grid gap-4">
          <div className="grid lg:gap-4">
            <p data-animation="fade-in-y" className="tracking-wider opacity-0">
              Author
            </p>
            <h2
              data-animation="fade-in-y"
              className="lg:text-6xl py-2 lg:py-0 text-4xl max-w-3xl lg:leading-[4.5rem] font-medium"
            >
              {data.title.rendered}
            </h2>
          </div>
          <p className="lg:text-xl text-lg max-w-2xl">{data?.acf.text}</p>
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
              <div>
                <h1 className="text-sm">WEBSITE</h1>
                <p className="font-medium">{data?.acf?.website}</p>
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

import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import React from "react";
import { EmptySvg } from "@/components/svgs";
import {
  IWordPressReturnTypeObj,
  PortfolioAcf,
} from "@/services/wordpress/types";

export default function CaseStudyList({
  data,
}: {
  data: IWordPressReturnTypeObj<PortfolioAcf>[];
}) {
  return (
    <>
      {data && data?.length > 0 ? (
        <section className="pt-[2rem]">
          <div className="grid  lg:grid-cols-layoutLg gap-8 gap-y-[4rem]">
            {data.map((item, idx) => (
              <Link href={`/casestudy/${item.id}`} key={item.id}>
                <article key={idx} className="grid gap-4">
                  <div className="h-[18rem] group overflow-hidden relative w-full">
                    <BlurImage
                      className="object-cover transition-transform  group-hover:scale-125"
                      fill
                      alt={item.title?.rendered}
                      src={item.acf.thumbnail}
                    />
                  </div>
                  <div className="pt-1 grid gap-1">
                    <h1 className="text-2xl line-clamp-3 font-medium">
                      {item.title.rendered}
                    </h1>
                    <p>{item.acf.text}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <div className="h-[30rem] flex flex-col items-center justify-center">
          <div className="relative pb-4 ">
            <EmptySvg />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-800">
            No Blog Published Yet!
          </h1>
          <p className=" text-zinc-600">
            Kindly check back later, we won&apos;t keep you waiting
          </p>
        </div>
      )}
    </>
  );
}

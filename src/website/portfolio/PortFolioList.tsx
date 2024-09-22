import React from "react";
import { BlurImage } from "@/components/ui/blurImage";
import Link from "next/link";
import {
  IWordPressReturnTypeObj,
  PortfolioAcf,
} from "@/services/wordpress/types";
import { EmptySvg } from "@/components/svgs";

export default function PortFolioList({
  data,
}: {
  data: IWordPressReturnTypeObj<PortfolioAcf>[];
}) {
  return (
    <>
      {data && data?.length > 0 ? (
        <div className="grid pt-[2rem] lg:grid-cols-2 gap-10">
          {data.map((item, idx) => (
            <Link href={`/portfolio/${item.id}`} key={item.id}>
              <article key={idx} className="grid gap-2">
                <div className="lg:h-[24rem] h-[18rem] group overflow-hidden relative w-full">
                  <BlurImage
                    className="object-cover"
                    fill
                    alt={item.title.rendered}
                    src={item.acf.thumbnail}
                  />
                  <div className="absolute w-full  text-[#FCFCFC] transition-all ease-out duration-500 cursor-pointer overflow-hidden group-hover:h-full h-0 top-0 bottom-0">
                    <div className="w-full h-full absolute top-0 bg-black/70"></div>
                    <div className="pt-1 relative z-10 items-center text-center p-4  h-full justify-end pb-14 flex flex-col gap-1">
                      <p className="text-sm line-clamp-2">
                        Highlighted Section
                      </p>
                      <h1 className="text-2xl  line-clamp-2 font-medium">
                        {item.title.rendered}
                      </h1>
                      <p className="text-sm line-clamp-3">Dummy TExt</p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[30rem] flex flex-col items-center justify-center">
          <div className="relative pb-4 ">
            <EmptySvg />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-800">
            No Potfolio Published Yet!
          </h1>
          <p className=" text-zinc-600">
            Kindly check back later, we won&apos;t keep you waiting
          </p>
        </div>
      )}
    </>
  );
}

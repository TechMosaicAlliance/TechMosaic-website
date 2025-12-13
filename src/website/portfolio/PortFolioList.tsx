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
  serviceFilter,
}: {
  data: IWordPressReturnTypeObj<PortfolioAcf>[];
  serviceFilter?: string;
}) {
  return (
    <>
      {data && data?.length > 0 ? (
        <>
          {serviceFilter && (
            <div className="pt-[2rem] pb-4">
              <h2 className="text-2xl lg:text-3xl font-semibold">
                {serviceFilter} Portfolio
              </h2>
              <p className="text-gray-600 mt-2">
                Showing {data.length} {data.length === 1 ? "project" : "projects"}
              </p>
            </div>
          )}
          <div className="grid pt-[2rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {data.map((item, idx) => (
              <Link href={`/portfolio/${item.id}`} key={item.id}>
                <article className="group cursor-pointer">
                  {/* Laptop Mockup */}
                  <div className="relative w-full mb-4">
                    <div className="relative transition-transform duration-300 group-hover:scale-[1.02]">
                      {/* Laptop Screen */}
                      <div className="relative bg-gray-200 rounded-t-lg rounded-b-sm p-1.5 lg:p-2 shadow-lg">
                        {/* Screen Bezel */}
                        <div className="bg-black rounded overflow-hidden relative aspect-[16/10]">
                          {/* Screen Content */}
                          <div className="absolute inset-0">
                            <BlurImage
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              fill
                              alt={item.title.rendered}
                              src={item.acf.thumbnail}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Laptop Base */}
                      <div className="relative mt-1">
                        {/* Keyboard Area */}
                        <div className="h-2 lg:h-3 bg-gray-300 rounded-t-sm"></div>
                        {/* Trackpad Area */}
                        <div className="h-8 lg:h-10 bg-gray-200 rounded-b-lg flex items-center justify-center">
                          <div className="w-16 lg:w-20 h-1 bg-gray-400/40 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-1 mt-3">
                    <h3 className="text-lg lg:text-xl font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                      {item.title.rendered}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600">
                      {item.acf.services || item.acf.companyname || "Portfolio Item"}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="h-[30rem] flex flex-col items-center justify-center">
          <div className="relative pb-4 ">
            <EmptySvg />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-800">
            {serviceFilter
              ? `No ${serviceFilter} Portfolio Published Yet!`
              : "No Potfolio Published Yet!"}
          </h1>
          <p className=" text-zinc-600">
            Kindly check back later, we won&apos;t keep you waiting
          </p>
        </div>
      )}
    </>
  );
}

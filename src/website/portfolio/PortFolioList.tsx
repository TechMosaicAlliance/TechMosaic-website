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
            <div className="pt-12 pb-8 mb-12 border-b border-gray-100">
              <div className="flex items-baseline gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-transparent"></div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                    {serviceFilter} Portfolio
                  </h2>
                  <p className="text-gray-500 mt-2 text-base font-light">
                    Showing <span className="font-medium text-gray-700">{data.length}</span> {data.length === 1 ? "project" : "projects"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {data.map((item, idx) => (
              <Link href={`/portfolio/${item.id}`} key={item.id}>
                <article className="group cursor-pointer">
                  {/* Laptop Mockup */}
                  <div className="relative w-full mb-6">
                    <div className="relative transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:-translate-y-2">
                      {/* Laptop Screen */}
                      <div className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-t-2xl rounded-b-sm p-2.5 lg:p-3 shadow-lg group-hover:shadow-2xl transition-shadow duration-700">
                        {/* Screen Bezel */}
                        <div className="bg-black rounded-xl overflow-hidden relative aspect-[16/10] shadow-2xl">
                          {/* Screen Content */}
                          <div className="absolute inset-0">
                            <BlurImage
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              fill
                              alt={item.title.rendered}
                              src={item.acf.thumbnail}
                            />
                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Laptop Base */}
                      <div className="relative mt-2">
                        {/* Keyboard Area */}
                        <div className="h-3 lg:h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-sm shadow-inner"></div>
                        {/* Trackpad Area */}
                        <div className="h-12 lg:h-14 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-2xl flex items-center justify-center shadow-inner">
                          <div className="w-24 lg:w-28 h-2 bg-gray-400/40 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 tracking-tight">
                      {item.title.rendered}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-500 font-light">
                      {item.acf.services || item.acf.companyname || "Portfolio Item"}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-[40rem] flex flex-col items-center justify-center py-20">
          <div className="relative pb-8 opacity-50">
            <EmptySvg />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            {serviceFilter
              ? `No ${serviceFilter} Portfolio Published Yet`
              : "No Portfolio Published Yet"}
          </h1>
          <p className="text-gray-500 text-base font-light max-w-md text-center">
            Kindly check back later, we won&apos;t keep you waiting
          </p>
        </div>
      )}
    </>
  );
}

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
            <div className="pt-8 pb-6 border-b border-gray-200 mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {serviceFilter} Portfolio
              </h2>
              <p className="text-gray-600 mt-3 text-lg">
                Showing <span className="font-semibold text-gray-900">{data.length}</span> {data.length === 1 ? "project" : "projects"}
              </p>
            </div>
          )}
          <div className="grid pt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {data.map((item, idx) => (
              <Link href={`/portfolio/${item.id}`} key={item.id}>
                <article className="group cursor-pointer">
                  {/* Laptop Mockup */}
                  <div className="relative w-full mb-5">
                    <div className="relative transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl">
                      {/* Laptop Screen */}
                      <div className="relative bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-xl rounded-b-sm p-2 lg:p-2.5 shadow-xl">
                        {/* Screen Bezel */}
                        <div className="bg-black rounded-lg overflow-hidden relative aspect-[16/10] shadow-inner">
                          {/* Screen Content */}
                          <div className="absolute inset-0">
                            <BlurImage
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              fill
                              alt={item.title.rendered}
                              src={item.acf.thumbnail}
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Laptop Base */}
                      <div className="relative mt-1.5">
                        {/* Keyboard Area */}
                        <div className="h-2.5 lg:h-3.5 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-sm shadow-md"></div>
                        {/* Trackpad Area */}
                        <div className="h-10 lg:h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-xl flex items-center justify-center shadow-inner">
                          <div className="w-20 lg:w-24 h-1.5 bg-gray-400/50 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {item.title.rendered}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600">
                      {item.acf.services || item.acf.companyname || "Portfolio Item"}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-[30rem] flex flex-col items-center justify-center py-16">
          <div className="relative pb-6">
            <EmptySvg />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {serviceFilter
              ? `No ${serviceFilter} Portfolio Published Yet!`
              : "No Portfolio Published Yet!"}
          </h1>
          <p className="text-gray-600 text-lg">
            Kindly check back later, we won&apos;t keep you waiting
          </p>
        </div>
      )}
    </>
  );
}

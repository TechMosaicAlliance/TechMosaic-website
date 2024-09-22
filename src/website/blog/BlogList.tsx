import { EmptySvg } from "@/components/svgs";
import { BlurImage } from "@/components/ui/blurImage";
import { BlogAcf, IWordPressReturnTypeObj } from "@/services/wordpress/types";
import Link from "next/link";
import React from "react";

export default function BlogListView({
  data,
}: {
  data: IWordPressReturnTypeObj<BlogAcf>[];
}) {
  return (
    <>
      {data && data?.length > 0 ? (
        <div className="grid pt-[2rem]  lg:grid-cols-layoutLg gap-4 ">
          {data.map((item, idx) => (
            <Link key={item.id} href={`/blogs/${item.id}`}>
              <article className="flex flex-col ">
                <div className=" min-h-[15rem] overflow-hidden relative w-full">
                  <BlurImage
                    className="object-cover"
                    fill
                    alt={item.title?.rendered}
                    src={item.acf.thumbnail}
                  />
                </div>
                <div className="border flex flex-col gap-2 p-4 h-full ">
                  <h1 className="text-2xl line-clamp-3 font-medium">
                    {item.title.rendered}
                  </h1>
                  <p className="">{item.acf.text}</p>
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

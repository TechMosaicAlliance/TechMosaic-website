import { BlurImage } from "@/components/ui/blurImage";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogAcf, IWordPressReturnTypeObj } from "@/services/wordpress/types";
import React from "react";
import { MarkDownComponents } from "../shared/mdFmt";
import { Button } from "@/components/ui/button";
import { ArrowRightSvg } from "@/components/svgs";
import { ArrowLeft } from "lucide-react";
import BackBtn from "../shared/Back";
import Link from "next/link";

export function SingleBlogContent({
  data,
}: {
  data: IWordPressReturnTypeObj<BlogAcf>;
}) {
  return (
    <>
      <div>
        <BackBtn />
        <div className="grid pt-10 gap-4">
          <div className="grid gap-4">
            <p className="tracking-wider">Author</p>
            <h2 className="lg:text-6xl text-3xl max-w-3xl lg:leading-[4.5rem] font-medium">
              {data.title.rendered}
            </h2>
          </div>
          <p className="lg:text-xl text-lg max-w-2xl">{data?.acf.text}</p>
        </div>
        <div>
          <section className=" border-black/60">
            <div className="relative  overflow-hidden mt-12 h-[18rem] lg:h-[34rem] w-full">
              <BlurImage
                alt={data.title?.rendered}
                fill
                src={data.acf.thumbnail}
                className="object-cover"
              />
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

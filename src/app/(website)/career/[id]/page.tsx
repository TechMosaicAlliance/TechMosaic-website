import SingleCareer from "@/website/career/singleCareer";
import { MDXRemote } from "next-mdx-remote/rsc";

import React, { Suspense } from "react";
import { BlogLoader } from "@/components/ui/loading";
import { MarkDownComponents } from "@/website/shared/mdFmt";
import { ApplyView } from "@/website/career/apply";
import { wordpressApi } from "@/services/wordpress";

export default async function page({ params }: any) {
  const paramsId = params.id;
  const data = await wordpressApi.career.getById(paramsId);
  return (
    <SingleCareer data={data}>
      <Suspense fallback={<BlogLoader />}>
        <div className="md:mt-[10rem] p-5">
          {/* CMS CONTENT */}
          <section className="pt-[4rem] prose max-w-5xl mx-auto">
            <MDXRemote
              source={data.acf.content}
              components={MarkDownComponents}
            />

            <section className="pt-[5rem] grid gap-10">
              <div className="">
                <h1 className="text-3xl font-medium">So What next ?</h1>
                <p>
                  If this sounds like the right opportunity for you, then
                  we&apos;d love to hear from you! Click on apply to this job to
                  send us your CV and cover letter and Experience from our
                  talent team will be in touch with you.
                </p>
              </div>

              <div className="">
                <h1 className="text-3xl font-medium">We are Tech Mosaiceans</h1>
                <p>
                  We&lsquo;re all made up of our Mosaic DNA, but what makes us
                  unique is our individual differences. We&lsquo;ve created a culture
                  of belonging and we celebrate the diversity our Mosaiceans add
                  to our teams. We encourage authenticity, different views, and
                  new ideas to enable us to create products that our customers
                  around the world enjoy and love. Read more about our culture
                  here
                </p>
              </div>
            </section>
            {/* Submit application */}
            <ApplyView item={data} />
            {/* Submit application */}
          </section>
        </div>
      </Suspense>
    </SingleCareer>
  );
}

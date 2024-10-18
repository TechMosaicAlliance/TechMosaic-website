import SingleCareer from "@/website/career/singleCareer";
import { MDXRemote } from "next-mdx-remote/rsc";

import React, { Suspense } from "react";
import { BlogLoader } from "@/components/ui/loading";
import { MarkDownComponents } from "@/website/shared/mdFmt";
import { ApplyView } from "@/website/career/apply";
import { wordpressApi } from "@/services/wordpress";
import WhatNext from "@/website/career/whatNext";

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

            <WhatNext />
            {/* Submit application */}
            <ApplyView item={data} />
            {/* Submit application */}
          </section>
        </div>
      </Suspense>
    </SingleCareer>
  );
}

import { BlurImage } from "@/components/ui/blurImage";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  BlogAcf,
  IWordPressReturnTypeObj,
  TermAcf,
} from "@/services/wordpress/types";
import React from "react";
import { MarkDownComponents } from "../shared/mdFmt";
import { Button } from "@/components/ui/button";
import { ArrowRightSvg } from "@/components/svgs";

export function TermsView({
  data,
}: {
  data: IWordPressReturnTypeObj<TermAcf>;
}) {
  return (
    <>
      <div>
        <div>
          {/* CMS CONTENT */}
          <section className="p-4 mt-[3rem] shadow-sm border-t-0 border border-black/5 text-[#191919] prose max-w-5xl mx-auto">
            <MDXRemote
              source={data.acf.content}
              components={MarkDownComponents}
            />
          </section>
        </div>
      </div>
    </>
  );
}

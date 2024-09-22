import React, { Suspense } from "react";
import { wordpressApi } from "@/services/wordpress";
import { CardLoader } from "@/components/ui/loading";
import CaseStudyList from "@/website/caseStudy/CaseStudyList";

export default async function page() {
  const data = await wordpressApi.casestudy.getAll();
  return (
    <Suspense fallback={<CardLoader />}>
      <CaseStudyList data={data} />
    </Suspense>
  );
}

import React, { Suspense } from "react";
import { wordpressApi } from "@/services/wordpress";
import { CardLoader } from "@/components/ui/loading";
import { TermsView } from "@/website/terms";

export default async function page() {
  const data = await wordpressApi.content.terms();
  return (
    <Suspense fallback={<CardLoader />}>
      <TermsView data={data[0]} />
    </Suspense>
  );
}

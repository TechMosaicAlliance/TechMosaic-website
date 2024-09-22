import { CardLoader } from "@/components/ui/loading";
import { wordpressApi } from "@/services/wordpress";
import PortFolioList from "@/website/portfolio/PortFolioList";

import React, { Suspense } from "react";

export default async function page() {
  const data = await wordpressApi.portfolio.getAll();
  return (
    <Suspense fallback={<CardLoader />}>
      <PortFolioList data={data} />
    </Suspense>
  );
}

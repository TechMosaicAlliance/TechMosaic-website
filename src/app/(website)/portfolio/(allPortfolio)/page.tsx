import { CardLoader } from "@/components/ui/loading";
import { wordpressApi } from "@/services/wordpress";
import PortFolioList from "@/website/portfolio/PortFolioList";
import React, { Suspense } from "react";

interface PageProps {
  searchParams: { service?: string };
}

export default async function page({ searchParams }: PageProps) {
  const allData = await wordpressApi.portfolio.getAll();
  
  // Filter by service if provided
  const data = searchParams.service
    ? allData.filter((item) => {
        const services = item.acf.services?.split(",").map((s) => s.trim()) || [];
        return services.some(
          (service) =>
            service.toLowerCase() === searchParams.service?.toLowerCase()
        );
      })
    : allData;

  return (
    <Suspense fallback={<CardLoader />}>
      <PortFolioList data={data} serviceFilter={searchParams.service} />
    </Suspense>
  );
}

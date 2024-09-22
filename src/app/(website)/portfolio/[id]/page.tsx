import { wordpressApi } from "@/services/wordpress";
import { SinglePortfolio } from "@/website/portfolio/singlePortfolio";
import React from "react";

export default async function page({ params }: any) {
  const paramsId = params.id;
  const data = await wordpressApi.portfolio.getById(paramsId);
  return <SinglePortfolio data={data} />;
}

import React, { Suspense } from "react";
import { wordpressApi } from "@/services/wordpress";
import BlogListView from "@/website/blog/BlogList";
import { CardLoader } from "@/components/ui/loading";

export default async function page() {
  const data = await wordpressApi.blog.getAll();
  return (
    <Suspense fallback={<CardLoader />}>
      <BlogListView data={data} />
    </Suspense>
  );
}

import React from "react";
import { SingleBlogContent } from "@/website/blog/singleBlog";
import { wordpressApi } from "@/services/wordpress";

export default async function page({ params }: any) {
  const paramsId = params.id;
  const data = await wordpressApi.blog.getById(paramsId);
  return <SingleBlogContent data={data} />;
}

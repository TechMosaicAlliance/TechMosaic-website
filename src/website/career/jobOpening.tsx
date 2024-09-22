"use client";

import { useRef, useState } from "react";
import { ArrowRight, LucideLoader, LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetCareerCategory, useGetCareers } from "../hooks";
import { ErrorCard } from "@/components/ui/cards";
import { useRouter } from "next/navigation";
import { BlogLoader, CardLoader } from "@/components/ui/loading";

export default function Component() {
  const router = useRouter();
  const {
    data,
    error: categoryError,
    isLoading: careerCategoryLoading,
  } = useGetCareerCategory();
  const {
    data: careers,
    error: careerError,
    isLoading: careerLoading,
  } = useGetCareers();

  const [activeCategory, setActiveCategory] = useState("All");
  const topSectionRef = useRef<HTMLDivElement>(null);
  const filteredJobs =
    activeCategory === "All"
      ? careers
      : careers?.filter(
          (job) => job.acf.career_category.name.toLowerCase() === activeCategory
        );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const error = careerError || careerError;
  const isLoading = careerLoading || careerCategoryLoading;

  if (error) {
    return (
      <div className="max-w-5xl p-20 mx-auto">
        <ErrorCard
          text="Something went wrong getting all careers ): Check back later"
          handleReset={() => router.refresh()}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-[7rem]">
        <LucideLoader2 className="w-[2rem] h-[2rem] text-slate-500 mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={topSectionRef}
      className="container max-w-6xl pt-[7rem] mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-medium mb-8">All Job Openings</h2>
      <div className="flex pt-[2rem] flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:sticky top-0 self-start md:w-1/4">
          {data && (
            <ul className="">
              {data?.map((category) => (
                <li
                  key={category.term_id}
                  className={`cursor-pointer p-3 transition-all duration-200 ease-in-out
             ${
               activeCategory === category.name
                 ? "bg-white border-l-4 border-blue-700 font-medium"
                 : "hover:bg-gray-100"
             }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}

          <div className="px-4 grid gap-4 pt-[2rem]">
            <p className="text-sm text-[#53648B]">
              We are always seeking talented people. In case you cannot find
              your desired position here, please send us your LinkedIn profile
              and give us your contact information. We will be in touch.{" "}
            </p>
            <Button className="rounded-full border-black" variant="outline">
              Share Your Linkedin Profile
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full md:w-3/4">
          {filteredJobs && filteredJobs?.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs?.map((job) => (
                <div key={job.id} className="p-6 bg-white">
                  <div className="flex flex-col gap-2 items-start mb-4">
                    <h3 className="text-xl font-semibold">
                      {job.acf.jobtitle}
                    </h3>

                    <div className="flex gap-2">
                      {job.acf.career_tags.map((item) => (
                        <span
                          key={item.name}
                          className=" border border-black text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2 line-clamp-3">
                    {job.acf.short_description}
                  </p>
                  <Link
                    href={`/career/${job.id}`}
                    className="flex text-sm items-center gap-2 bg-black text-white px-4 py-2 rounded-full w-fit ml-auto hover:bg-gray-800 transition-colors"
                  >
                    See Position
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex pt-[10rem] gap-4 flex-col items-center justify-center">
              <h1 className="text-2xl tracking-tight font-semibold text-zinc-800">
                No Career For Selected Filter
              </h1>
              <p className=" text-zinc-600">
                Kindly check back later, we won&apos;t keep you waiting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

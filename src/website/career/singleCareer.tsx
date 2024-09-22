import React, { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CareerAcf, IWordPressReturnTypeObj } from "@/services/wordpress/types";
import Link from "next/link";
export default function SingleCareer({
  children,
  data,
}: {
  children: ReactNode;
  data: IWordPressReturnTypeObj<CareerAcf>;
}) {
  return (
    <section>
      <div className="relative w-full flex   items-center md:h-[28rem] ">
        <Image
          alt=""
          src="/assets/get-to-know.jpg"
          fill
          className="object-cover absolute"
        />
        <div className="relative md:-mb-[23rem] p-4 bg-primary py-20  md:p-20 max-w-5xl w-full flex justify-center md:text-center gap-10  mx-auto z-20 ">
          <div className="grid h-fit gap-4">
            <div className="flex flex-col items-center justify-center gap-4 text-white">
              <h2 className=" max-w-2xl text-3xl md:text-4xl font-medium">
                {data?.acf.jobtitle}
              </h2>
            </div>
            <p className=" md:text-center mx-auto  text-lg text-white max-w-xl">
              {data?.acf.short_description}
            </p>
            <Link href="/career">
              <Button className="md:w-fit md:mx-auto border-white border rounded-none bg-transparent text-white ">
                JOIN OUR TEAM
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

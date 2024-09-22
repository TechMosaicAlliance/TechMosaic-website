import React from "react";
import Image from "next/image";

const data = [
  {
    name: "Career Growth",
    text: "At TechMosaic, we nurture and provide the resources employees to become an exceptional global talent in their field.",
  },
  {
    name: "Hybrid Work Model",
    text: "We are a global team across multiple countries. We reduce our carbon footprint by staying remote with opportunities for in-office collaboration.",
  },
  {
    name: "Compensation Benefits",
    text: "We are committed to fair pay, flexible hours, inclusion and diversity, with competitive benefits.",
  },
];

export default function Perks() {
  return (
    <div className="pt-[5rem]">
      <div className="container max-w-6xl grid gap-[7rem] mx-auto">
        <div className="grid gap-8">
          <h1 className="lg:text-4xl text-3xl font-medium ">
            Benefits And Perks
          </h1>
          <div className="grid lg:grid-cols-3 gap-5 ">
            {data.map((item, idx) => (
              <div
                className="bg-white rounded-lg w-full text-center grid gap-1 p-8"
                key={idx}
              >
                <h1 className="lg:text-2xl text-xl font-medium">{item.name}</h1>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          <h1 className="lg:text-4xl text-3xl font-medium ">Join Our Team</h1>
          <div className="grid grid-cols-3 ">
            <div className="rounded-tl-[14rem] overflow-hidden">
              <Image
                src="/assets/team1.jpg"
                alt="Team member 1"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden px-5">
              <Image
                src="/assets/team2.jpg"
                alt="Team member 2"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="rounded-tr-[14rem] overflow-hidden">
              <Image
                src="/assets/team4.jpg"
                alt="Team member 3"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="rounded-bl-[14rem] overflow-hidden">
              <Image
                src="/assets/team5.jpg"
                alt="Team member 4"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden px-5 ">
              <Image
                src="/assets/team3.jpg"
                alt="Team member 5"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="rounded-br-[14rem] overflow-hidden">
              <Image
                src="/assets/team6.jpg"
                alt="Team member 6"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

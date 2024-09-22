import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
// import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { useGetFaq } from "../hooks";

const ResponsiveImage = (props: any) => (
  <Image
    alt={props.alt}
    width={900}
    height={400}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover my-2 rounded-2xl"
    {...props}
  />
);
const H1 = (props: any) => (
  <h1 className=" text-[1.8em]  leading-4  font-semibold" {...props} />
);
const H2 = (props: any) => (
  <h2 className="text-[1.3em]  leading-4  font-semibold" {...props} />
);
const H3 = (props: any) => (
  <h3 className="text-[1.23em] leading-4  font-semibold" {...props} />
);
const H4 = (props: any) => (
  <h4 className="text-[1em] leading-4  font-semibold" {...props} />
);
const H5 = (props: any) => (
  <h5 className="text-[0.9rem] leading-4  font-semibold" {...props} />
);
const Text = (props: any) => <p className="text-[1em]" {...props} />;
const LI = (props: any) => <li className="" {...props} />;

const components = {
  img: ResponsiveImage,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  p: Text,
  li: LI,
};

export default function Faq() {
  const { data } = useGetFaq();
  return (
    <>
      {data && data.length > 0 ? (
        <section>
          <div className="grid gap-4">
            <div className="grid gap-4">
              <p className="tracking-wider">FAQS</p>
              <h2 className="lg:text-6xl text-4xl max-w-3xl lg:leading-[4rem] font-medium">
                <span className="tracking-tight">Frequently Asked</span>
                <br />
                <span className="playfair-display italic">Questions</span>
              </h2>
            </div>
          </div>
          <Accordion className="pt-5" type="single" collapsible>
            {data.map((item, idx) => (
              <AccordionItem key={idx} value={idx + "ddn"}>
                <AccordionTrigger className="text-left text-lg  no-underline">
                  {item.acf.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.acf.answer}
                  {/* <main className=" max-w-none w-full mx-auto prose prose-pre:p-0 text-zinc-600">
                    <ReactMarkdown className="" components={components}>
                      {item.answer}
                    </ReactMarkdown>
                  </main> */}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

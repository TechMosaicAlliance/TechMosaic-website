import { BlurImage } from "@/components/ui/blurImage";

const ResponsiveImage = (props: any) => (
  <div className="overflow-hidden">
    <BlurImage
      alt={props.alt}
      width={900}
      height={400}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover my-2 rounded-2xl"
      {...props}
    />
  </div>
);

const H1 = (props: any) => (
  <h1 className="leading-7  font-semibold" {...props} />
);
const H2 = (props: any) => (
  <h2 className="leading-7 prose-stone  font-semibold" {...props} />
);
const H3 = (props: any) => (
  <h3 className="leading-7  font-semibold" {...props} />
);
const H4 = (props: any) => (
  <h4 className=" leading-7  font-semibold" {...props} />
);
const H5 = (props: any) => (
  <h5 className="leading-7  font-semibold" {...props} />
);
const Text = (props: any) => <p className="" {...props} />;
const LI = (props: any) => <li className="" {...props} />;

export const MarkDownComponents = {
  img: ResponsiveImage,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  p: Text,
  li: LI,
  // code: Pre,
  // inlineCode: Code,
};

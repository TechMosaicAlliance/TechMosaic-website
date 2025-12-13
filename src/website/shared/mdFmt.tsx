import React from "react";
import { BlurImage } from "@/components/ui/blurImage";

// Preprocess MDX content to remove or convert string style attributes
export const preprocessMDXContent = (content: string): string => {
  if (!content || typeof content !== "string") return content;
  
  // Remove style attributes that are strings (inline styles)
  // This regex matches style="..." or style='...' and removes it
  // Handles both single and double quotes
  return content.replace(/\s+style\s*=\s*["'][^"']*["']/gi, "");
};

// Helper function to convert string style to object
const parseStyle = (style: string | object | undefined): object | undefined => {
  if (!style) return undefined;
  if (typeof style === "object" && style !== null) return style;
  if (typeof style !== "string") return undefined;

  // Parse CSS string like "color: red; margin: 10px;" to object
  const styleObj: Record<string, string> = {};
  style.split(";").forEach((declaration) => {
    const trimmed = declaration.trim();
    if (!trimmed) return;
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) return;
    
    const property = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).trim();
    
    if (property && value) {
      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase()
      );
      styleObj[camelProperty] = value;
    }
  });
  return Object.keys(styleObj).length > 0 ? styleObj : undefined;
};

// Helper to sanitize props and convert style strings to objects
const sanitizeProps = (props: any) => {
  const { style, ...rest } = props;
  const sanitizedStyle = parseStyle(style);
  return {
    ...rest,
    ...(sanitizedStyle && { style: sanitizedStyle }),
  };
};

const ResponsiveImage = (props: any) => {
  const sanitized = sanitizeProps(props);
  return (
    <div className="overflow-hidden">
      <BlurImage
        alt={sanitized.alt}
        width={900}
        height={400}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover my-2 rounded-2xl"
        {...sanitized}
      />
    </div>
  );
};

const H1 = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <h1 className="leading-7  font-semibold" {...sanitized} />;
};
const H2 = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <h2 className="leading-7 prose-stone  font-semibold" {...sanitized} />;
};
const H3 = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <h3 className="leading-7  font-semibold" {...sanitized} />;
};
const H4 = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <h4 className=" leading-7  font-semibold" {...sanitized} />;
};
const H5 = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <h5 className="leading-7  font-semibold" {...sanitized} />;
};
const H6 = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <h6 className="leading-7  font-semibold" {...sanitized} />;
};
const Text = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <p className="" {...sanitized} />;
};
const LI = (props: any) => {
  const sanitized = sanitizeProps(props);
  return <li className="" {...sanitized} />;
};

// Generic wrapper for any HTML element to sanitize style props
const createSanitizedElement = (tag: string) => {
  const Component = (props: any) => {
    const sanitized = sanitizeProps(props);
    return React.createElement(tag, sanitized);
  };
  Component.displayName = `Sanitized${tag.charAt(0).toUpperCase() + tag.slice(1)}`;
  return Component;
};

// Common HTML elements that might appear in MDX content
const Div = createSanitizedElement("div");
const Span = createSanitizedElement("span");
const Strong = createSanitizedElement("strong");
const Em = createSanitizedElement("em");
const A = createSanitizedElement("a");
const Ul = createSanitizedElement("ul");
const Ol = createSanitizedElement("ol");
const Blockquote = createSanitizedElement("blockquote");
const Code = createSanitizedElement("code");
const Pre = createSanitizedElement("pre");
const Br = createSanitizedElement("br");
const Hr = createSanitizedElement("hr");
const Table = createSanitizedElement("table");
const Thead = createSanitizedElement("thead");
const Tbody = createSanitizedElement("tbody");
const Tr = createSanitizedElement("tr");
const Td = createSanitizedElement("td");
const Th = createSanitizedElement("th");
const Section = createSanitizedElement("section");
const Article = createSanitizedElement("article");
const Aside = createSanitizedElement("aside");
const Header = createSanitizedElement("header");
const Footer = createSanitizedElement("footer");
const Nav = createSanitizedElement("nav");
const Main = createSanitizedElement("main");
const B = createSanitizedElement("b");
const I = createSanitizedElement("i");
const U = createSanitizedElement("u");
const Small = createSanitizedElement("small");
const Sub = createSanitizedElement("sub");
const Sup = createSanitizedElement("sup");
const Del = createSanitizedElement("del");
const Ins = createSanitizedElement("ins");
const Mark = createSanitizedElement("mark");
const Time = createSanitizedElement("time");
const Address = createSanitizedElement("address");
const Cite = createSanitizedElement("cite");
const Abbr = createSanitizedElement("abbr");
const Dfn = createSanitizedElement("dfn");
const Kbd = createSanitizedElement("kbd");
const Samp = createSanitizedElement("samp");
const Var = createSanitizedElement("var");
const Bdi = createSanitizedElement("bdi");
const Bdo = createSanitizedElement("bdo");
const Wbr = createSanitizedElement("wbr");
const Details = createSanitizedElement("details");
const Summary = createSanitizedElement("summary");
const Dialog = createSanitizedElement("dialog");
const Figure = createSanitizedElement("figure");
const Figcaption = createSanitizedElement("figcaption");
const Iframe = createSanitizedElement("iframe");
const Object = createSanitizedElement("object");
const Embed = createSanitizedElement("embed");
const Video = createSanitizedElement("video");
const Audio = createSanitizedElement("audio");
const Source = createSanitizedElement("source");
const Track = createSanitizedElement("track");
const Canvas = createSanitizedElement("canvas");
const Svg = createSanitizedElement("svg");
const Form = createSanitizedElement("form");
const Input = createSanitizedElement("input");
const Textarea = createSanitizedElement("textarea");
const Button = createSanitizedElement("button");
const Select = createSanitizedElement("select");
const Optgroup = createSanitizedElement("optgroup");
const Option = createSanitizedElement("option");
const Label = createSanitizedElement("label");
const Fieldset = createSanitizedElement("fieldset");
const Legend = createSanitizedElement("legend");
const Datalist = createSanitizedElement("datalist");
const Output = createSanitizedElement("output");
const Progress = createSanitizedElement("progress");
const Meter = createSanitizedElement("meter");
const Dl = createSanitizedElement("dl");
const Dt = createSanitizedElement("dt");
const Dd = createSanitizedElement("dd");
const Caption = createSanitizedElement("caption");
const Colgroup = createSanitizedElement("colgroup");
const Col = createSanitizedElement("col");
const Tfoot = createSanitizedElement("tfoot");

export const MarkDownComponents = {
  img: ResponsiveImage,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Text,
  li: LI,
  div: Div,
  span: Span,
  strong: Strong,
  em: Em,
  a: A,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  br: Br,
  hr: Hr,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  td: Td,
  th: Th,
  section: Section,
  article: Article,
  aside: Aside,
  header: Header,
  footer: Footer,
  nav: Nav,
  main: Main,
  b: B,
  i: I,
  u: U,
  small: Small,
  sub: Sub,
  sup: Sup,
  del: Del,
  ins: Ins,
  mark: Mark,
  time: Time,
  address: Address,
  cite: Cite,
  abbr: Abbr,
  dfn: Dfn,
  kbd: Kbd,
  samp: Samp,
  var: Var,
  bdi: Bdi,
  bdo: Bdo,
  wbr: Wbr,
  details: Details,
  summary: Summary,
  dialog: Dialog,
  figure: Figure,
  figcaption: Figcaption,
  iframe: Iframe,
  object: Object,
  embed: Embed,
  video: Video,
  audio: Audio,
  source: Source,
  track: Track,
  canvas: Canvas,
  svg: Svg,
  form: Form,
  input: Input,
  textarea: Textarea,
  button: Button,
  select: Select,
  optgroup: Optgroup,
  option: Option,
  label: Label,
  fieldset: Fieldset,
  legend: Legend,
  datalist: Datalist,
  output: Output,
  progress: Progress,
  meter: Meter,
  dl: Dl,
  dt: Dt,
  dd: Dd,
  caption: Caption,
  colgroup: Colgroup,
  col: Col,
  tfoot: Tfoot,
};

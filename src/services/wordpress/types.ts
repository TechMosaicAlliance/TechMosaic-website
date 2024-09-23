export interface IWordPressReturnTypeObj<T> {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: GUID;
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: GUID;
  template: string;
  meta: Meta;
  "blog-categories": number[];
  class_list: string[];
  acf: T;
  _links: Links;
}

export interface Links {
  self: About[];
  collection: About[];
  about: About[];
  "acf:term": Term[];
  "wp:attachment": About[];
  "wp:term": Term[];
  curies: Cury[];
}

export interface About {
  href: string;
}

export interface Term {
  embeddable: boolean;
  taxonomy: string;
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

export interface BlogAcf {
  content: string;
  thumbnail: string;
  category_: Category;
  author: string;
  text: string;
}
export interface TermAcf {
  content: string;
  text: string;
}

export interface PortfolioAcf {
  content: string;
  thumbnail: string;
  text: string;
  services: string;
  companyname: string;
  website: string;
  timeline: string;
  signuprate: string;
  category: boolean;
}
export interface TeamAcf {
  image: string;
  role: string;
  name: string;
  text?: string;
}

export interface ContentAcf {
  "about-image1": string;
  "about-image2": string;
  "about-image3": string;
  "about-image4": string;
  "service-video": string;
  "inside-mosaic-video": string;
  role: string;
  name: string;
  text?: string;
}

export interface CareerAcf {
  content: string;
  short_description: string;
  career_tags: Category[];
  career_category: Category;
  jobtitle: string;
}
export interface FaqAcf {
  question: string;
  answer: string;
}

export interface Category {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
}

export interface GUID {
  rendered: string;
}

export interface Meta {
  _acf_changed: boolean;
}

export interface IAddContact {
  acf: {
    fullname: string;
    phone: string;
    companyname: string;
    email: string;
    aboutproject: string;
    title: string;
  };
}

export interface IApply {
  acf: {
    fullname: string;
    phone: string;
    email: string;
    title: string;
    why_do_you: string;
    about_you: string;
    job: any;
  };
}

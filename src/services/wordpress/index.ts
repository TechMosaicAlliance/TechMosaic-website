import { transformContent } from "@/lib/utils";
import { request } from "../apiConfig";
import { wordPressBaseUrl } from "../constants";
import {
  BlogAcf,
  CareerAcf,
  Category,
  ContentAcf,
  FaqAcf,
  IAddContact,
  IApply,
  ILinkedin,
  IWordPressReturnTypeObj,
  LogoAcf,
  PortfolioAcf,
  TeamAcf,
  TermAcf,
} from "./types";

const defaultQuery = "?per_page=100&fields=acf&acf_format=standard";

// Define the API object with reusable functions for different methods
export const wordpressApi = {
  blog: {
    getAll: async () => {
      const data = await request<IWordPressReturnTypeObj<BlogAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/blog${defaultQuery}`,
        method: "GET",
      });
      return data;
    },

    getById: async (id: number) => {
      const data = await request<IWordPressReturnTypeObj<BlogAcf>, void>({
        customUrl: `${wordPressBaseUrl}/blog/${id}${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
  },
  casestudy: {
    getAll: async () => {
      const data = await request<IWordPressReturnTypeObj<PortfolioAcf>[], void>(
        {
          customUrl: `${wordPressBaseUrl}/casestudy${defaultQuery}`,
          method: "GET",
        }
      );
      return data;
    },
    getById: async (id: number) => {
      const data = await request<IWordPressReturnTypeObj<PortfolioAcf>, void>({
        customUrl: `${wordPressBaseUrl}/casestudy/${id}${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
  },
  portfolio: {
    getAll: async () => {
      const data = await request<IWordPressReturnTypeObj<PortfolioAcf>[], void>(
        {
          customUrl: `${wordPressBaseUrl}/portfolio${defaultQuery}`,
          method: "GET",
        }
      );
      return data;
    },
    getById: async (id: number) => {
      const data = await request<IWordPressReturnTypeObj<PortfolioAcf>, void>({
        customUrl: `${wordPressBaseUrl}/portfolio/${id}${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
  },

  career: {
    getAll: async () => {
      const data = await request<IWordPressReturnTypeObj<CareerAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/career${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
    getAllCategory: async () => {
      const data = await request<Category[], void>({
        customUrl: `${wordPressBaseUrl}/career-category${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
    getById: async (id: number) => {
      const data = await request<IWordPressReturnTypeObj<CareerAcf>, void>({
        customUrl: `${wordPressBaseUrl}/career/${id}${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
    apply: async (payload: IApply) => {
      const data = await request<IWordPressReturnTypeObj<TeamAcf>[], IApply>({
        customUrl: `${wordPressBaseUrl}/jobapplication${defaultQuery}`,
        method: "POST",
        body: payload,
      });
      return data;
    },

    linkedin: async (payload: ILinkedin) => {
      const data = await request<IWordPressReturnTypeObj<TeamAcf>[], ILinkedin>(
        {
          customUrl: `${wordPressBaseUrl}/linkedin${defaultQuery}`,
          method: "POST",
          body: payload,
        }
      );
      return data;
    },
  },

  content: {
    terms: async () => {
      const data = await request<IWordPressReturnTypeObj<TermAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/privacy${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
    team: async () => {
      const data = await request<IWordPressReturnTypeObj<TeamAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/team${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
    contents: async () => {
      const data = await request<IWordPressReturnTypeObj<ContentAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/content${defaultQuery}`,
        method: "GET",
      });
      if (data && data.length > 0) {
        return transformContent(data[0]);
      }
    },
    logos: async () => {
      const data = await request<IWordPressReturnTypeObj<LogoAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/companylogos${defaultQuery}`,
        method: "GET",
      });

      return data;
    },
    contact: async (payload: IAddContact) => {
      const data = await request<
        IWordPressReturnTypeObj<TeamAcf>[],
        IAddContact
      >({
        customUrl: `${wordPressBaseUrl}/contact${defaultQuery}`,
        method: "POST",
        body: payload,
      });
      return data;
    },
    newsletter: async (payload: { acf: { email: string } }) => {
      const data = await request<
        IWordPressReturnTypeObj<TeamAcf>[],
        { acf: { email: string } }
      >({
        customUrl: `${wordPressBaseUrl}/newsletter${defaultQuery}`,
        method: "POST",
        body: payload,
      });
      return data;
    },
    testimonials: async () => {
      const data = await request<IWordPressReturnTypeObj<TeamAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/testimonial${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
  },
  faq: {
    getAll: async () => {
      const data = await request<IWordPressReturnTypeObj<FaqAcf>[], void>({
        customUrl: `${wordPressBaseUrl}/faq${defaultQuery}`,
        method: "GET",
      });
      return data;
    },
  },
};

import {
  handleMutationError,
  handleMutationSuccess,
} from "@/hooks/queryhooks/queryhandler";
import { wordpressApi } from "@/services/wordpress";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTestimonials = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.content.testimonials(),
    queryKey: ["getTestimonials"],
  });

  return data;
};

export const useGetPortfolio = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.portfolio.getAll(),
    queryKey: ["getAllPortfolio"],
  });

  return data;
};

export const useGetBlogs = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.blog.getAll(),
    queryKey: ["getAllBlogs"],
  });

  return data;
};

export const useGetCasestudy = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.casestudy.getAll(),
    queryKey: ["getAllCaseStudy"],
  });
  return data;
};

export const useGetTeams = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.content.team(),
    queryKey: ["getAllCaseStudy"],
  });
  return data;
};

export const useGetFaq = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.faq.getAll(),
    queryKey: ["getAllFaq"],
  });
  return data;
};
export const useGetLogos = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.content.logos(),
    queryKey: ["getAllCompanyLogos"],
  });
  return data;
};

export const useGetContents = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.content.contents(),
    queryKey: ["getAllContents"],
  });
  return data;
};

export const useGetCareerCategory = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.career.getAllCategory(),
    queryKey: ["getAllCareerCategory"],
  });
  return data;
};

export const useGetCareers = () => {
  const data = useQuery({
    queryFn: () => wordpressApi.career.getAll(),
    queryKey: ["getAllCareer"],
  });
  return data;
};

export const useApplyJob = () => {
  const data = useMutation({
    mutationFn: wordpressApi.career.apply,
    onSuccess(data) {
      handleMutationSuccess(data);
    },
    onError(error) {
      handleMutationError({ error });
    },
  });

  return data;
};

export const useLinkedin = () => {
  const data = useMutation({
    mutationFn: wordpressApi.career.linkedin,
    onSuccess(data) {
      handleMutationSuccess(data);
    },
    onError(error) {
      handleMutationError({ error });
    },
  });

  return data;
};

export const useAddContact = () => {
  const data = useMutation({
    mutationFn: wordpressApi.content.contact,
    onSuccess(data) {
      handleMutationSuccess(data);
    },
    onError(error) {
      handleMutationError({ error });
    },
  });

  return data;
};

export const useAddNewsletter = () => {
  const data = useMutation({
    mutationFn: wordpressApi.content.newsletter,
    onSuccess(data) {
      handleMutationSuccess(data);
    },
    onError(error) {
      handleMutationError({ error });
    },
  });

  return data;
};

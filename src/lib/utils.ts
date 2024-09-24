import {
  IWordPressReturnTypeObj,
  ContentAcf,
} from "@/services/wordpress/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformUrl(url: string, id: any) {
  // Parse the URL
  let parsedUrl = new URL(url);

  // Extract the domain and post ID
  let domain = parsedUrl.origin;
  let postId = parsedUrl.searchParams.get("p") as any;

  // Construct the new URL
  let newUrl = new URL(`${domain}/wp-admin/post.php`);
  newUrl.searchParams.set("post", id);
  newUrl.searchParams.set("action", "edit");

  return newUrl.toString();
}

export interface TransformedContent {
  images: string[];
  results: string[];
  otherContent: Omit<IWordPressReturnTypeObj<ContentAcf>, "acf"> & {
    acf: Omit<
      ContentAcf,
      "about-image1" | "about-image2" | "about-image3" | "about-image4"
    >;
  };
}

export const transformContent = (
  item: IWordPressReturnTypeObj<ContentAcf>
): TransformedContent => {
  const { acf, ...otherContent } = item;
  const images = [
    acf["about-image1"],
    acf["about-image2"],
    acf["about-image3"],
    acf["about-image4"],
  ].filter(Boolean); // This removes any falsy values (undefined, null, empty string)

  const results = [
    acf["happy-client"],
    acf["projects"],
    acf["team-members"],
    acf["satisfaction"],
  ].filter(Boolean); // This removes any falsy values (undefined, null, empty string)

  const {
    "about-image1": _img1,
    "about-image2": _img2,
    "about-image3": _img3,
    "about-image4": _img4,
    ...restAcf
  } = acf;

  return {
    results,
    images,
    otherContent: {
      ...otherContent,
      acf: restAcf,
    },
  };
};

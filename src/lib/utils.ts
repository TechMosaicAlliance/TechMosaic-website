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

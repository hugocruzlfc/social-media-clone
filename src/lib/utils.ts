import { clsx, type ClassValue } from "clsx";
import { formatDate, formatDistanceToNowStrict } from "date-fns";
import { twMerge } from "tailwind-merge";
import { PAGE_SIZE } from "./constants";
import { PostData, PostsPage } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
  const currentDate = new Date();
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, "MMM d");
    } else {
      return formatDate(from, "MMM d, yyyy");
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function updateDynamicUrl(
  url: string,
  segment: string,
  value: string,
): string {
  return url.replace(`:${segment}`, value);
}

export function formatPostData(posts: PostData[]) {
  const nextCursor = posts.length > PAGE_SIZE ? posts[PAGE_SIZE].id : null;

  const data: PostsPage = {
    posts: posts.slice(0, PAGE_SIZE),
    nextCursor,
  };

  return data;
}

import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  const d = new Date(date);
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  // less than 5 minutes
  if (diff < 1000 * 60 * 5) {
    return "방금 전";
  }
  if (diff < 1000 * 60 * 60 * 24) {
    return formatDistanceToNowStrict(d, { addSuffix: true, locale: ko });
  }
  if (diff < 1000 * 60 * 60 * 36) {
    return "어제";
  }
  if (diff < 1000 * 60 * 60 * 24 * 7) {
    return formatDistanceToNowStrict(d, { addSuffix: true, locale: ko });
  }
  return format(d, "yyyy년 M월 d일");
};

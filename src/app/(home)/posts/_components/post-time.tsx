"use client";

import { formatDate } from "@/lib/utils";

interface PostTimeProps {
  time: string;
}

export function PostTime({ time }: PostTimeProps) {
  return (
    <time className="text-[13px]" dateTime={time} suppressHydrationWarning>
      {formatDate(time)}
    </time>
  );
}

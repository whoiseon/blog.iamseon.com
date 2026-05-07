"use client";

import { Suspense } from "react";

import { formatDate } from "@/lib/utils";

interface RelativeTimeProps {
  date: string;
  className?: string;
  /**
   * 라벨 문자열 템플릿. `{date}` 자리가 상대시간으로 치환됩니다.
   * 예: "({date} 업데이트)" → "(20일 전 업데이트)"
   */
  format?: string;
}

function RelativeTimeLabel({ date, className, format }: RelativeTimeProps) {
  const relative = formatDate(date);
  const label = format ? format.replace("{date}", relative) : relative;

  return (
    <time dateTime={date} className={className} suppressHydrationWarning>
      {label}
    </time>
  );
}

export function RelativeTime(props: RelativeTimeProps) {
  return (
    <Suspense fallback={<time dateTime={props.date} className={props.className} />}>
      <RelativeTimeLabel {...props} />
    </Suspense>
  );
}

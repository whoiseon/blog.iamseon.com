"use client";

import { Suspense } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

interface RelativeTimeProps {
  date: string;
  className?: string;
}

function RelativeTimeLabel({ date, className }: RelativeTimeProps) {
  const label = formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
    locale: ko,
  });

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

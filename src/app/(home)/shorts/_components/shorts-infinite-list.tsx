"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { loadMoreShorts } from "@/app/(home)/shorts/_actions/load-more-shorts";

interface ShortsInfiniteListProps {
  initialItems: ReactNode;
  initialCursor: string | null;
  activeTags: string[];
}

export function ShortsInfiniteList({
  initialItems,
  initialCursor,
  activeTags,
}: ShortsInfiniteListProps) {
  const [pages, setPages] = useState<ReactNode[]>([initialItems]);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursor) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || cancelled) return;
        observer.disconnect();
        setIsLoading(true);
        const result = await loadMoreShorts(cursor, activeTags);
        if (cancelled) return;
        if (result.items) {
          setPages((prev) => [...prev, result.items]);
        }
        setCursor(result.nextCursor);
        setIsLoading(false);
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [cursor, activeTags]);

  return (
    <>
      {pages}
      {cursor && (
        <div
          ref={sentinelRef}
          className="text-muted-foreground py-8 text-center text-sm"
          aria-live="polite"
        >
          {isLoading ? "불러오는 중..." : ""}
        </div>
      )}
    </>
  );
}

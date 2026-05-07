"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MarkdownRender } from "@/app/(home)/_components/markdown-render";

interface ShortPostContentProps {
  html: string;
  slug: string;
  collapsible?: boolean;
}

const COLLAPSED_HEIGHT = 600;

export function ShortPostContent({ html, slug, collapsible = true }: ShortPostContentProps) {
  if (!collapsible) {
    return (
      <div className="pb-6 md:pb-10">
        <MarkdownRender html={html} className="px-6 md:px-10" />
      </div>
    );
  }

  return <CollapsibleShortPostContent html={html} slug={slug} />;
}

function CollapsibleShortPostContent({ html, slug }: { html: string; slug: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const check = () => {
      setIsOverflow(el.scrollHeight > COLLAPSED_HEIGHT);
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [html]);

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={cn("overflow-hidden", isOverflow ? "max-h-150" : "pb-6 md:pb-10")}
      >
        <MarkdownRender html={html} className="px-6 md:px-10" />
      </div>
      {isOverflow && (
        <>
          <div className="from-app-background pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-linear-to-t to-transparent" />
          <div className="absolute inset-x-0 bottom-6 flex justify-center md:bottom-10">
            <Link
              href={`/shorts/${slug}`}
              className="border-border bg-app-background hover:bg-muted rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
            >
              내용 더보기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

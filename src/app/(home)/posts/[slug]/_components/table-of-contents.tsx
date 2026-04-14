"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { type Heading } from "@/app/(home)/posts/[slug]/_lib/parse-headings";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="scrollbar-hide sticky top-14 mx-auto hidden h-[calc(100vh-56px)] w-56 shrink-0 animate-[fadeInRight_0.5s_ease-out_0.2s_both] overflow-y-auto pt-10 pb-10 lg:block">
      <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
        목차
      </h3>
      <ul className="border-border space-y-1 border-l-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-0.5 block border-l-2 px-4 py-1 text-sm transition-colors",
                activeId === heading.id
                  ? "border-primary text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

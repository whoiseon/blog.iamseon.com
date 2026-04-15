"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CheckIcon, LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PostHeaderProps {
  title: string;
  publishedAt: string;
  category: string;
  tags: string[];
}

export function PostHeader({ title, publishedAt, category, tags }: PostHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    if (isCopied) return;

    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <header className="mb-4">
      <p className="text-muted-foreground mb-4 text-sm">{category}</p>
      <h1 className="leadng-[1.25] mb-2 text-4xl font-bold wrap-break-word break-keep">{title}</h1>
      <div className="mb-10 flex gap-2 text-sm font-normal">
        <span>황인선</span>
        <span className="text-muted-foreground">Frontend Developer</span>
      </div>
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 font-normal">
          <span>{format(publishedAt, "yyyy년 MM월 dd일")} 발행</span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-x-1 px-2 py-1 text-blue-400 hover:bg-transparent dark:text-blue-300 dark:hover:bg-transparent"
            onClick={handleCopy}
          >
            {isCopied ? <CheckIcon className="size-3.5" /> : <LinkIcon className="size-3.5" />}
            {isCopied ? "링크 복사!" : "공유"}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted rounded-sm px-2 py-1 text-xs font-medium dark:bg-neutral-800/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

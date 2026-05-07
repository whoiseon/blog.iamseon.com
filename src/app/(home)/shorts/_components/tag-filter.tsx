"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { XIcon } from "lucide-react";

import type { Tag as TagData } from "@/lib/api/services/posts.service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

interface TagFilterProps {
  tags: TagData[];
}

export function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeTags = new Set(
    (searchParams.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );

  const toggleTag = (name: string) => {
    const next = new Set(activeTags);
    if (next.has(name)) {
      next.delete(name);
    } else {
      next.add(name);
    }

    const params = new URLSearchParams(searchParams);
    if (next.size === 0) {
      params.delete("tags");
    } else {
      params.set("tags", [...next].join(","));
    }

    const qs = params.toString();
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  };

  const clear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("tags");
    const qs = params.toString();
    startTransition(() => {
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  };

  return (
    <div className={cn("flex flex-col gap-2", isPending && "opacity-60")}>
      <div className="flex min-h-7.5 items-center justify-between">
        <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Tags
        </h2>
        {activeTags.size > 0 && (
          <Button
            variant="ghost"
            size="xs"
            onClick={clear}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => {
          const isActive = activeTags.has(tag.name);
          return (
            <Tag
              key={tag.id}
              className="text-[13px]"
              variant={isActive ? "active" : "default"}
              onClick={() => toggleTag(tag.name)}
              aria-pressed={isActive}
            >
              {tag.name}
              {isActive && <XIcon className="size-2.5" />}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}

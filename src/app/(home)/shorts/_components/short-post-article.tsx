import Link from "next/link";

import { PostDetail } from "@/lib/api/services/posts.service";
import { markdownToHtml } from "@/lib/markdown/markdown-to-html";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { CodeCopyHandler } from "@/app/(home)/_components/code-copy-handler";
import { RelativeTime } from "@/app/(home)/shorts/_components/relative-time";
import { ShortPostContent } from "@/app/(home)/shorts/_components/short-post-content";

interface ShortPostArticleProps {
  post: PostDetail;
  headerAction?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}

export async function ShortPostArticle({
  post,
  headerAction,
  className,
  collapsible = true,
}: ShortPostArticleProps) {
  const html = await markdownToHtml(post.markdown);

  return (
    <div
      className={cn("border-border flex flex-col border-b last:border-b-0 lg:border-x", className)}
    >
      <header className="mb-8 px-5 pt-8 md:px-10 md:pt-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-x-2">{headerAction}</div>
          <Link
            href={`/shorts/${post.slug}`}
            className="hover:text-primary mb-4 flex text-2xl font-bold transition-colors hover:underline"
          >
            <h1 className="leadng-[1.25] wrap-break-word break-keep">{post.title}</h1>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-1">
            {post.tags.map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </div>
          {post.publishedAt && (
            <RelativeTime date={post.publishedAt} className="text-muted-foreground text-sm" />
          )}
        </div>
      </header>
      <CodeCopyHandler />
      <ShortPostContent html={html} slug={post.slug} collapsible={collapsible} />
    </div>
  );
}

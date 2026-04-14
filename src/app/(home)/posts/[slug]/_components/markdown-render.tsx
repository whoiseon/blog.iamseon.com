import { format } from "date-fns";

import { CodeCopyHandler } from "@/app/(home)/posts/[slug]/_components/code-copy-handler";
import { markdownToHtml } from "@/app/(home)/posts/[slug]/_lib/markdown-to-html";
import { PostDetail } from "@/app/api/_lib/services/posts.service";

interface MarkdownRenderProps {
  post: PostDetail;
}

export async function MarkdownRender({ post }: MarkdownRenderProps) {
  const html = await markdownToHtml(post.markdown);

  return (
    <article className="w-full min-w-0 px-1 py-10 md:pr-6 md:pl-12">
      <div className="w-full md:max-w-170">
        <header className="mb-8">
          <h1 className="leadng-[1.25] mb-4 text-3xl font-bold wrap-break-word break-keep">
            {post.title}
          </h1>
          <div className="mb-8 flex gap-4 text-sm font-normal">
            <div className="inline-flex flex-col items-start gap-1.5">
              <span className="text-muted-foreground">작성자</span>
              <span>황인선</span>
            </div>
            <div className="inline-flex flex-col items-start gap-1.5">
              <span className="text-muted-foreground">발행일</span>
              <span>{format(post.publishedAt!, "yyyy-MM-dd")}</span>
            </div>
          </div>
        </header>
        <CodeCopyHandler />
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}

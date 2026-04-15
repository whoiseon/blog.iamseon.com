import { PostDetail } from "@/lib/api/services/posts.service";
import { CodeCopyHandler } from "@/app/(home)/posts/[slug]/_components/code-copy-handler";
import { MarkdownRender } from "@/app/(home)/posts/[slug]/_components/markdown-render";
import { PostHeader } from "@/app/(home)/posts/[slug]/_components/post-header";
import { markdownToHtml } from "@/app/(home)/posts/[slug]/_lib/markdown-to-html";

interface MarkdownRenderProps {
  post: PostDetail;
}

export async function PostArticle({ post }: MarkdownRenderProps) {
  const html = await markdownToHtml(post.markdown);

  return (
    <article className="w-full min-w-0 px-1 pt-10 pb-50 md:pr-6 md:pl-12">
      <div className="w-full md:max-w-170">
        <PostHeader
          title={post.title}
          publishedAt={post.publishedAt!}
          category={post.category.name}
          tags={post.tags.map((tag) => tag.name)}
        />
        <CodeCopyHandler />
        <MarkdownRender html={html} />
      </div>
    </article>
  );
}

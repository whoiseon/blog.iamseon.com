import { PostDetail } from "@/lib/api/services/posts.service";
import { markdownToHtml } from "@/lib/markdown/markdown-to-html";
import { CodeCopyHandler } from "@/app/(home)/_components/code-copy-handler";
import { MarkdownRender } from "@/app/(home)/_components/markdown-render";
import { PostHeader } from "@/app/(home)/posts/[slug]/_components/post-header";

interface MarkdownRenderProps {
  post: PostDetail;
}

export async function PostArticle({ post }: MarkdownRenderProps) {
  const html = await markdownToHtml(post.markdown);

  return (
    <article className="w-full min-w-0 px-1 py-10 md:pr-6 md:pl-12">
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

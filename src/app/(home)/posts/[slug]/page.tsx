import { notFound } from "next/navigation";

import { getPostBySlug, getPosts, getPostsByCategory } from "@/lib/api/services/posts.service";
import { createBlogPostingSchema, serializeJsonLd } from "@/lib/json-ld";
import { generatePostMetadata } from "@/lib/metadata";
import { OtherPosts } from "@/app/(home)/posts/[slug]/_components/other-posts";
import { PostArticle } from "@/app/(home)/posts/[slug]/_components/post-article";
import { TableOfContents } from "@/app/(home)/posts/[slug]/_components/table-of-contents";
import { parseHeadings } from "@/app/(home)/posts/[slug]/_lib/parse-headings";

export const generateMetadata = generatePostMetadata;

export async function generateStaticParams() {
  const { payload } = await getPosts();
  return payload?.results.map((post) => ({ slug: post.slug })) ?? [];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { error: getPostError, payload: post } = await getPostBySlug(slug);

  const { error: getPostsError, payload: posts } = await getPostsByCategory();

  if (getPostError || !post) {
    notFound();
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createBlogPostingSchema(post, "posts")),
        }}
      />
      <div className="relative mx-auto max-w-(--app-layout-width) px-4 md:flex md:flex-row">
        {!getPostsError && posts && (posts?.size || 0) > 0 && (
          <OtherPosts posts={posts} slug={slug} />
        )}
        <PostArticle post={post} />
        <TableOfContents headings={parseHeadings(post.markdown)} />
      </div>
    </main>
  );
}

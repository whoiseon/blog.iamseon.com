import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getPostBySlug, getPostsByCategory } from "@/lib/api/services/posts.service";
import { OtherPosts } from "@/app/(home)/posts/[slug]/_components/other-posts";
import { PostArticle } from "@/app/(home)/posts/[slug]/_components/post-article";
import { TableOfContents } from "@/app/(home)/posts/[slug]/_components/table-of-contents";
import { parseHeadings } from "@/app/(home)/posts/[slug]/_lib/parse-headings";

async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { error: getPostError, payload: post } = await getPostBySlug(slug);

  const { error: getPostsError, payload: posts } = await getPostsByCategory();

  if (getPostError || !post) {
    notFound();
  }

  return (
    <main>
      <div className="relative mx-auto max-w-(--app-layout-width) px-4 md:flex md:flex-row">
        {!getPostsError && posts && (posts?.size || 0) > 0 && (
          <OtherPosts posts={posts} slug={slug} />
        )}
        <PostArticle post={post} />
        <TableOfContents headings={parseHeadings(post.markdown)} />
      </div>
    </main>
  );

  // return (
  //   <main className="bg-app-background flex items-stretch">
  //     <nav className="border-border flex grow flex-col items-end border-r">
  //       <div className="h-full w-75 px-6">123</div>
  //     </nav>
  //     <article className="flex w-full grow flex-col items-start lg:w-auto lg:items-end">
  //       <div className="mb-15 h-full min-h-12 w-full px-5 lg:mr-6 lg:w-200 lg:max-w-200 lg:px-6">
  //         <header className="mb-8">
  //           <h1 className="text-3xl font-bold">{post.title}</h1>
  //           {post.publishedAt && (
  //             <time className="text-muted-foreground mt-2 block text-sm">{post.publishedAt}</time>
  //           )}
  //         </header>
  //       </div>
  //       <div className="prose dark:prose-invert max-w-none">
  //         <ReactMarkdown>{post.markdown}</ReactMarkdown>
  //       </div>
  //     </article>
  //     <div>2</div>
  //   </main>
  // );
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostDetail params={params} />
    </Suspense>
  );
}

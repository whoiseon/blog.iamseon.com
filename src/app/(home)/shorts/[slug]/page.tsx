import { notFound } from "next/navigation";

import { getPostBySlug, getPosts } from "@/lib/api/services/posts.service";
import { createBlogPostingSchema, serializeJsonLd } from "@/lib/json-ld";
import { generatePostMetadata } from "@/lib/metadata";
import { ShortPostArticle } from "@/app/(home)/shorts/_components/short-post-article";
import { ShortsBackButton } from "@/app/(home)/shorts/[slug]/_components/shorts-back-button";

export const generateMetadata = generatePostMetadata;

export async function generateStaticParams() {
  const { payload } = await getPosts({ type: "short" });
  return payload?.results.map((post) => ({ slug: post.slug })) ?? [];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { error: getPostError, payload: post } = await getPostBySlug(slug);

  if (getPostError || !post) {
    notFound();
  }

  return (
    <main className="flex w-full grow flex-col items-start lg:w-auto lg:items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createBlogPostingSchema(post, "shorts")),
        }}
      />
      <div className="h-full min-h-12 w-full lg:w-200 lg:max-w-200 lg:px-6">
        <ShortPostArticle
          post={post}
          className="border-0 lg:border-0"
          headerAction={<ShortsBackButton />}
          collapsible={false}
          isDetailPage
        />
      </div>
    </main>
  );
}

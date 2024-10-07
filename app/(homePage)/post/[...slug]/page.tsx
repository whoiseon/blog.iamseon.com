import PostPage from '@/src/views/post';
import { getPostBySlug, getPostList } from '@/src/shared/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ScrollTopHeader from '@/src/widgets/header/ui/ScrollTopHeader';
import { isAllowedUser } from '@/src/shared/lib/utils/server';

export const runtime = 'nodejs';

type PageParams = {
  slug: string[];
};

interface Props {
  params: PageParams;
}

async function getPost(slug: string) {
  const response = await getPostBySlug(slug);
  return response.payload;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const response = (await getPostList({})) || { payload: { list: [] } };

  return response.payload!.list.map((post) => ({
    slug: post.urlSlug!.split('/'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug?.join('/') || '';
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  const title = post?.title;
  const description = post?.description;
  const url = post?.urlSlug && `https://iamseon.com/post/${post.urlSlug}`;
  const ogImage = post?.thumbnail ? post.thumbnail : '/opengraph-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description: description || '',
      url: url || '',
      images: [{ url: ogImage, alt: post?.title }],
    },
  };
}

async function PostViewPage({ params }: Props) {
  const isAllowed = isAllowedUser();
  const slug = params?.slug?.join('/') || '';
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <ScrollTopHeader isAdmin={isAllowed} />
      <PostPage post={post} />
    </>
  );
}

export default PostViewPage;

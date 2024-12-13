import { getPostBySlug, getPostList } from '@/src/shared/lib/api';
import { isAllowedUser } from '@/src/shared/lib/utils/server';
import PostPage from '@/src/views/post';
import ScrollTopHeader from '@/src/widgets/header/ui/ScrollTopHeader';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

type PageParams = {
  slug: string[];
};

interface Props {
  params: Promise<PageParams>;
}

async function getPost(slug: string) {
  const response = await getPostBySlug(slug);
  return response.payload;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const response = (await getPostList({})) || { payload: { list: [] } };
    console.log(response);

    return response.payload!.list.map((post) => ({
      slug: post.urlSlug!.split('/'),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

export const revalidate = 180;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

async function PostViewPage(props: Props) {
  const params = await props.params;
  const isAllowed = await isAllowedUser();
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

import PostPage from '@/src/views/post';

type PageParams = {
  slug: string[];
};

interface Props {
  params: PageParams;
}

function PostViewPage({ params }: Props) {
  const slug = params?.slug?.join('/') || '';
  const decodedSlug = decodeURIComponent(slug);

  return <PostPage />;
}

export default PostViewPage;

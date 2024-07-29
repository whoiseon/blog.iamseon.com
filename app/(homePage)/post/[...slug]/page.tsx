import PostPage from '@/src/pages/post/ui/PostPage';

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

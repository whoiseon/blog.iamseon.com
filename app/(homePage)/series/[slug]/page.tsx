import PostPage from '@/src/views/post';
import MainServerProvider from '@/src/widgets/main/ui/MainServerProvider';
import SeriesPage from '@/src/views/series';

type PageParams = {
  slug: string;
};

interface Props {
  params: PageParams;
}

function SeriesPostPage({ params }: Props) {
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);

  return (
    <MainServerProvider seriesSlug={decodedSlug}>
      <SeriesPage seriesSlug={decodedSlug} />
    </MainServerProvider>
  );
}

export default SeriesPostPage;

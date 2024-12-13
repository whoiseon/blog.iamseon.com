import MainServerProvider from '@/src/widgets/main/ui/MainServerProvider';
import SeriesPage from '@/src/views/series';

type PageParams = {
  slug: string;
};

interface Props {
  params: Promise<PageParams>;
}

async function SeriesPostPage(props: Props) {
  const params = await props.params;
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);

  return (
    <MainServerProvider seriesSlug={decodedSlug} orderBy="asc">
      <SeriesPage seriesSlug={decodedSlug} />
    </MainServerProvider>
  );
}

export default SeriesPostPage;

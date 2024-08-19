import HomePage from '@/src/views/home';
import MainServerProvider from '@/src/widgets/main/ui/MainServerProvider';

function Home({ searchParams }: { searchParams: { tag: string } }) {
  return (
    <MainServerProvider tag={searchParams.tag}>
      <HomePage />
    </MainServerProvider>
  );
}

export default Home;

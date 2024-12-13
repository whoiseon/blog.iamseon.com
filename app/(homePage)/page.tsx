import HomePage from '@/src/views/home';
import MainServerProvider from '@/src/widgets/main/ui/MainServerProvider';

async function Home(props: { searchParams: Promise<{ tag: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <MainServerProvider tag={searchParams.tag}>
      <HomePage />
    </MainServerProvider>
  );
}

export default Home;

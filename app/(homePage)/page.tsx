import { Suspense } from 'react';
import HomePage from '@/src/views/home';

function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}

export default Home;

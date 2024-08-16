import { Suspense } from 'react';
import HomePage from '@/src/views/home';
import { getIP } from '@/src/shared/lib/utils/server/ index';

function Home() {
  const ip = getIP();
  return (
    <Suspense>
      <span>{ip}</span>
      <HomePage />
    </Suspense>
  );
}

export default Home;

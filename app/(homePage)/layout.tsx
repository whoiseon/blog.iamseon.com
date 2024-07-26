import { PropsWithChildren } from 'react';
import AppHeader from '@/src/widgets/header/ui/AppHeader';

function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}

export default HomeLayout;

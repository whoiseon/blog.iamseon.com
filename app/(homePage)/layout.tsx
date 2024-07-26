import { PropsWithChildren } from 'react';
import AppHeader from '@/src/widgets/header/ui/AppHeader';
import AppFooter from '@/src/widgets/footer/ui/AppFooter';

function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}

export default HomeLayout;

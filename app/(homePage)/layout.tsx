import { ReactNode } from 'react';
import AppHeader from '@/src/widgets/header/ui/AppHeader';
import AppFooter from '@/src/widgets/footer/ui/AppFooter';

interface Props {
  children?: ReactNode;
}

function HomeLayout({ children }: Props) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}

export default HomeLayout;

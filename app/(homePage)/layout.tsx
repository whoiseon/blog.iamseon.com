import { ReactNode } from 'react';
import AppHeader from '@/src/widgets/header/ui/AppHeader';
import AppFooter from '@/src/widgets/footer/ui/AppFooter';
import { isAllowedUser } from '@/src/shared/lib/utils/server/ index';
import MainServerProvider from '@/src/widgets/main/ui/MainServerProvider';

interface Props {
  children?: ReactNode;
}

async function HomeLayout({ children }: Props) {
  const isAllowed = isAllowedUser();

  return (
    <>
      <AppHeader isAdmin={isAllowed} />
      {children}
      <AppFooter />
    </>
  );
}

export default HomeLayout;

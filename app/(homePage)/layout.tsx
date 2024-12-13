import { isAllowedUser } from '@/src/shared/lib/utils/server';
import AppFooter from '@/src/widgets/footer/ui/AppFooter';
import AppHeader from '@/src/widgets/header/ui/AppHeader';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

async function HomeLayout({ children }: Props) {
  const isAllowed = await isAllowedUser();

  return (
    <>
      <AppHeader isAdmin={isAllowed} />
      {children}
      <AppFooter />
    </>
  );
}

export default HomeLayout;

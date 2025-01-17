'use client';

import HeaderNavList from './HeaderNavList';
import Logo from '@/src/shared/assets/Logo/Logo';
import { useAuth } from '@/src/shared/lib/hooks';
import { usePathname } from 'next/navigation';

interface Props {
  isAdmin: boolean;
}

function AppHeader({ isAdmin = false }: Props) {
  useAuth();
  const pathname = usePathname();
  const isPostPage = pathname.split('/')[1] === 'post';

  return (
    <header
      className={`${isPostPage ? '' : 'sticky top-0'} w-full h-[50px] z-50 bg-white dark:bg-black`}
    >
      <div
        className={`w-full max-w-full h-full border-b-[1px] border-b-neutral-200 dark:border-b-neutral-800`}
      >
        <div className="header-inner flex h-full mx-auto items-center">
          <div className="flex items-center h-full min-h-headerHeight mr-5">
            <Logo />
          </div>
          <div className="flex flex-1 max-h-full justify-end">
            <HeaderNavList isAdmin={isAdmin} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

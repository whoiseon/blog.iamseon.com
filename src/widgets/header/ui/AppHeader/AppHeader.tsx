'use client';

import HeaderNavList from './HeaderNavList';
import Logo from '@/src/shared/assets/Logo/Logo';

function AppHeader() {
  return (
    <header className="sticky top-0 h-[50px] z-50 bg-inherit">
      <div className="w-full max-w-full h-full m-auto border-b-[1px] border-b-neutral-200 dark:border-b-neutral-800">
        <div className="header-inner flex h-full mx-auto">
          <div className="flex items-center h-full min-h-headerHeight mr-5">
            <Logo />
          </div>
          <div className="flex flex-1 max-h-full justify-end">
            <HeaderNavList />
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

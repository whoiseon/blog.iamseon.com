'use client';

import { usePathname } from 'next/navigation';

function AppFooter() {
  const pathname = usePathname();

  if (pathname === '/write') return null;

  return (
    <footer className="h-[80px] bg-white dark:bg-black">
      <div className="flex items-center justify-center h-full">
        <span className="text-neutral-600 dark:text-neutral-300 text-sm">
          Copyright © <b>WHOISEON</b>, All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default AppFooter;

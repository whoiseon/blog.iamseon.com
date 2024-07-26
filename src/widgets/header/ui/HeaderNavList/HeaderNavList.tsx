'use client';

import ThemeToggle from '@/src/features/theme/ThemeToggle/ThemeToggle';
import { Icons } from '@/src/shared/assets';
import { LinkButton } from '@/src/shared/ui';

function HeaderNavList() {
  return (
    <ul className="flex items-center gap-x-1.5 -mr-1.5">
      <li>
        <LinkButton
          variant="icon"
          size="icon"
          href="https://github.com/whoiseon"
          target="_blank"
        >
          <Icons.Github width={22} height={22} className="text-inherit" />
        </LinkButton>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
}

export default HeaderNavList;

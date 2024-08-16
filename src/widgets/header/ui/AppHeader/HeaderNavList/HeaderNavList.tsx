'use client';

import ThemeToggle from '../../../../../features/theme/ui/ThemeToggle';
import { Icons } from '@/src/shared/assets';
import { Button, LinkButton } from '@/src/shared/ui';
import { useUser } from '@/src/shared/states';
import Image from 'next/image';
import UserAddon from '@/src/features/user/ui/UserAddon';

interface Props {
  isAdmin: boolean;
}

function HeaderNavList({ isAdmin = false }: Props) {
  const user = useUser();
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
      {isAdmin && (
        <li>
          {user ? (
            <UserAddon />
          ) : (
            <LinkButton
              variant="primary"
              size="xs"
              weight="bold"
              href="/auth/sign"
            >
              로그인
            </LinkButton>
          )}
        </li>
      )}
    </ul>
  );
}

export default HeaderNavList;

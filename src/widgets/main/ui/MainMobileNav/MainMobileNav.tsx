'use client';

import { LinkButton } from '@/src/shared/ui';
import { usePathname } from 'next/navigation';
import { useEffect, memo, useLayoutEffect } from 'react';
import { useMainTabActiveId, useMainTabSetActiveId } from '@/src/shared/states';

interface Props {
  visible?: boolean;
}

interface MobileNavItem {
  id: number;
  title: string;
  href: string;
}

const mobileNavMap: MobileNavItem[] = [
  { id: 1, title: '포스트', href: '/' },
  { id: 2, title: '시리즈', href: '/series' },
  { id: 3, title: '태그', href: '/tags' },
];

function MainMobileNav({ visible }: Props) {
  const pathname = usePathname();
  const currentTab =
    mobileNavMap.find((item) => item.href === pathname)?.id || 1;

  const activeId = useMainTabActiveId() || currentTab;
  const setActiveId = useMainTabSetActiveId();

  useEffect(() => {
    const currentTab = mobileNavMap.find(({ href }) => href === pathname);
    setActiveId(currentTab?.id || 1); // 기본값은 첫 번째 탭
  }, [pathname]);

  if (!visible) return null;

  return (
    <nav className="relative flex items-center lg:hidden w-[224px]">
      {mobileNavMap.map(({ title, href }) => {
        const isActive = pathname === href;
        return (
          <LinkButton
            key={title}
            href={href}
            className={`${isActive ? 'text-neutral-950 dark:text-neutral-50' : 'text-neutral-600 dark:text-neutral-400'} w-[70px]`}
            weight="bold"
          >
            {title}
          </LinkButton>
        );
      })}
      <div
        className="absolute left-0 bottom-0 w-[70px] h-[2px] bg-black dark:bg-white"
        style={{
          transform: `translateX(${(activeId - 1) * 100}%)`, // 바의 위치 조정
          transition: 'transform 0.3s ease', // 부드러운 애니메이션
        }}
      />
    </nav>
  );
}

export default memo(MainMobileNav);

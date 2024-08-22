'use client';

import { ReactNode } from 'react';
import MainMobileNav from '@/src/widgets/main/ui/MainMobileNav';

interface Props {
  title: string;
  children: ReactNode;
  isSticky?: boolean;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hasMobileMenu?: boolean;
}

function ContentContainer({
  title,
  children,
  isSticky = false,
  titleSize = 'lg',
  className,
  hasMobileMenu = false,
}: Props) {
  const parseTitleSize = () => {
    switch (titleSize) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-md';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
    }
  };

  return (
    <div
      className={`${className ? className : ''} ${isSticky ? 'sticky top-[74px]' : ''} flex flex-col gap-y-3 pt-[1.25rem] lg:pt-[3rem]`}
    >
      <h3
        className={`${parseTitleSize()} font-bold text-neutral-600 dark:text-neutral-400 ${hasMobileMenu ? 'hidden lg:block' : ''}`}
      >
        {title}
      </h3>
      <MainMobileNav visible={hasMobileMenu} />
      {children}
    </div>
  );
}

export default ContentContainer;

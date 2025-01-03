'use client';

import MainMobileNav from '@/src/widgets/main/ui/MainMobileNav';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  isSticky?: boolean;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hasMobileMenu?: boolean;
  fontWeight?: 'medium' | 'bold';
  titleColor?: 'default' | 'muted';
}

function ContentContainer({
  title,
  children,
  isSticky = false,
  titleSize = 'lg',
  className,
  hasMobileMenu = false,
  fontWeight = 'bold',
  titleColor = 'muted',
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
      className={`${className ? className : ''} ${isSticky ? 'sticky top-[74px]' : ''} flex flex-col gap-y-3 mt-[1.25rem] lg:mt-[3rem]`}
    >
      <h3
        className={`${parseTitleSize()} font-${fontWeight} ${titleColor === 'muted' ? 'text-neutral-600 dark:text-neutral-400' : 'text-neutral-900 dark:text-neutral-50'} ${hasMobileMenu ? 'hidden lg:block' : ''}`}
      >
        {title}
      </h3>
      <MainMobileNav visible={hasMobileMenu} />
      {children}
    </div>
  );
}

export default ContentContainer;

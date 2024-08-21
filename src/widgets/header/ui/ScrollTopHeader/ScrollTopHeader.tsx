'use client';

import Logo from '@/src/shared/assets/Logo/Logo';
import HeaderNavList from '@/src/widgets/header/ui/AppHeader/HeaderNavList';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getScrollTop } from '@/src/shared/lib/utils';
import { usePathname } from 'next/navigation';

interface Props {
  isAdmin: boolean;
}

function ScrollTopHeader({ isAdmin }: Props) {
  const pathname = usePathname();
  const isPostPage = pathname.split('/')[1] === 'post';

  const [visible, setVisible] = useState<boolean>(false);
  const blockRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [marginTop, setMarginTop] = useState<number>(0);

  useEffect(() => {
    if (!blockRef.current) return;
    setHeight(blockRef.current.clientHeight);
    setMarginTop(-1 * blockRef.current.clientHeight);
  }, []);

  const prevScrollTop = useRef<number>(0);
  const direction = useRef<'UP' | 'DOWN'>('DOWN');
  const transitionPoint = useRef<number>(0);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    if (
      direction.current === 'DOWN' &&
      nextDirection === 'UP' &&
      transitionPoint.current - scrollTop < 0
    ) {
      setVisible(true);
      transitionPoint.current = scrollTop;
    }

    if (
      direction.current === 'UP' &&
      nextDirection === 'DOWN' &&
      scrollTop - transitionPoint.current < -1 * height
    ) {
      transitionPoint.current = scrollTop + height;
    }

    if (scrollTop < 50) {
      setVisible(false);
    }

    setMarginTop(
      Math.min(0, -1 * height + transitionPoint.current - scrollTop),
    );

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;
  }, [height]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div
      className={`fixed top-0 w-full h-[50px] z-50 bg-white dark:bg-black transition`}
      style={
        visible
          ? { marginTop, display: 'block' }
          : { marginTop: -1 * height, opacity: 0 }
      }
      ref={blockRef}
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
    </div>
  );
}

export default ScrollTopHeader;

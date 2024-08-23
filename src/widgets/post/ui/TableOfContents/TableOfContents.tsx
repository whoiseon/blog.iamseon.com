'use client';

import { TOCItem } from '@/src/widgets/post/lib/utils';
import TableOfContentItem from '@/src/widgets/post/ui/TableOfContents/TableOfContentItem';
import HeadingViewProvider from '@/src/widgets/post/ui/TableOfContents/HeadingViewProvider';
import { useHeadingView } from '@/src/widgets/post/ui/TableOfContents/HeadingViewProvider/HeadingViewProvider';
import { useCallback, useEffect, useState } from 'react';
import { getScrollTop } from '@/src/shared/lib/utils';
import ContentContainer from '@/src/shared/ui/lab/ContentContainer';

interface Props {
  toc: TOCItem[];
}

function TableOfContentsChildren({ toc }: Props) {
  const { headingId, setHeadingId } = useHeadingView();
  const [headingTops, setHeadingTops] = useState<
    | null
    | {
        id: string;
        top: number;
      }[]
  >(null);

  const updateTocPositions = useCallback(() => {
    if (!toc) return;
    const scrollTop = getScrollTop();
    const headingTops = toc.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) {
        return {
          id,
          top: 0,
        };
      }

      const top = el.getBoundingClientRect().top + scrollTop;
      return {
        id,
        top,
      };
    });

    setHeadingTops(headingTops);
  }, [toc]);

  useEffect(() => {
    updateTocPositions();
    let prevScrollHeight = document.body.scrollHeight;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    function checkScrollHeight() {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        updateTocPositions();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(checkScrollHeight, 250);
    }
    timeoutId = setTimeout(checkScrollHeight, 250);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateTocPositions]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    if (!headingTops) return;
    const currentHeading = [...headingTops].reverse().find((headingTop) => {
      return scrollTop >= headingTop.top - 4;
    });

    if (!currentHeading) {
      setHeadingId('');
      return;
    }

    setHeadingId(currentHeading.id);
  }, [headingTops]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  if (!toc || !headingTops) return null;

  return (
    <ContentContainer
      title="ON THIS PAGE"
      titleSize="sm"
      className="animate-fadeIn"
      isSticky
    >
      <div className="flex flex-col gap-y-1">
        {toc.map((item) => (
          <TableOfContentItem
            key={item.id}
            item={item}
            isActive={headingId === item.id}
          />
        ))}
      </div>
    </ContentContainer>
  );
}

function TableOfContents({ toc }: Props) {
  return (
    <HeadingViewProvider>
      <TableOfContentsChildren toc={toc} />
    </HeadingViewProvider>
  );
}

export default TableOfContents;

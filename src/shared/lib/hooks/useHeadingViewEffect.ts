import { useIsomorphicLayoutEffect } from '@/src/shared/lib/hooks/useIsomorphicLayoutEffect';
import { useHeadingView } from '@/src/widgets/post/ui/TableOfContents/HeadingViewProvider/HeadingViewProvider';
import { usePathname } from 'next/navigation';

export function useHeadingViewEffect(id: string) {
  const { setHeadingId } = useHeadingView();
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingId(id);
        }
      },
      {
        rootMargin: '0px 0px -80% 0px',
      },
    );

    const heading = document.getElementById(id);

    if (heading) {
      observer.observe(heading);
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);
}

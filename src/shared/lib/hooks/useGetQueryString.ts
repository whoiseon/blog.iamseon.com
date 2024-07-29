import { useSearchParams } from 'next/navigation';

export function useGetQueryString(
  queryTitle?: string,
): string | null | undefined {
  const searchParams = useSearchParams();
  if (queryTitle) {
    return searchParams?.get(queryTitle);
  } else {
    return searchParams?.toString();
  }
}

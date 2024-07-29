import { useSearchParams } from 'next/navigation';

export function useGetQuery(queryTitle: string): string | null | undefined {
  const searchParams = useSearchParams();
  return searchParams?.get(queryTitle);
}

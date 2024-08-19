import { GetPostListParams } from '@/src/shared/entities';
import { replaceDashToSpace } from '@/src/shared/lib/utils';

export const queryKeyMap = {
  series: {
    key: ['series'],
    list: ['series', 'all'],
    listForMain: ['series', 'main'],
  },
  post: {
    key: ['post'],
    getPost: (postId: number) => ['post', postId],
    getPostList: ({ tag, seriesSlug }: GetPostListParams) => [
      'post',
      'public',
      'series',
      seriesSlug ? seriesSlug : null,
      'tag',
      tag ? replaceDashToSpace(tag) : 'all',
    ],
  },
  tag: {
    key: ['tag'],
    getAllTag: ['tag', 'all'],
  },
} as const;

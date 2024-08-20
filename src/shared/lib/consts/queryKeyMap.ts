import { GetPostListParams } from '@/src/shared/entities';
import { replaceDashToSpace } from '@/src/shared/lib/utils';

export const queryKeyMap = {
  series: {
    key: ['series'],
    list: ['series', 'all'],
    listForMain: ['series', 'main'],
  },
  post: {
    key: ['posts'],
    getPost: (postId: number) => ['post', postId],
    getPostList: ({ tag, seriesSlug }: GetPostListParams) => [
      'posts',
      'public',
      'series',
      seriesSlug ? seriesSlug : null,
      'tag',
      tag ? replaceDashToSpace(tag) : 'all',
    ],
    getTempPostList: ['posts', 'temp'],
  },
  tag: {
    key: ['tag'],
    getAllTag: ['tag', 'all'],
  },
} as const;

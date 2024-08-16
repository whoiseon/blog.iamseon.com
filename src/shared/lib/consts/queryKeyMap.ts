export const queryKeyMap = {
  series: {
    list: ['series'],
  },
  post: {
    key: ['post'],
    getPost: (postId: number) => ['post', postId],
  },
  tag: {
    key: ['tag'],
    getAllTag: ['tag', 'all'],
  },
} as const;

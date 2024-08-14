export const queryKeyMap = {
  series: {
    list: ['series'],
  },
  post: {
    key: ['post'],
    getPost: (postId: number) => ['post', postId],
  },
} as const;

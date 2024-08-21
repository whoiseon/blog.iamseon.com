import { Post, Series } from '@prisma/client';

export interface PublishPostPayload {
  slug: string;
}

export interface PublishPostParams {
  id?: number;
  title: string;
  body: string;
  description: string;
  thumbnail: string;
  tags: string[];
  urlSlug: string;
  seriesId?: number;
  isPublic: boolean;
}

export interface GetPostParams {
  postId: number;
}

export interface GetPostPayload {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  urlSlug: string | null;
  body: string | null;
  description: string | null;
  thumbnail: string | null;
  isPublic: boolean;
  series: {
    id: number;
    name: string;
    list?: PostPayloadForPostList[];
  } | null;
  tags: string[];
  nextPost?: Post | null;
  prevPost?: Post | null;
}

export interface GetPostListParams {
  tag?: string;
  isPublic?: boolean;
  seriesSlug?: string;
  orderBy?: 'asc' | 'desc';
}

export interface PostListPayload {
  list: PostPayloadForPostList[];
  series?: Series | null;
}

export interface PostPayloadForPostList {
  id: number;
  createdAt: Date;
  title: string;
  urlSlug: string | null;
  description: string | null;
  thumbnail: string | null;
}

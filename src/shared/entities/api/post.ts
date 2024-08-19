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
  } | null;
  tags: string[];
}

export interface GetPostListParams {
  tag?: string;
  isPublic?: boolean;
  seriesSlug?: string;
}

export interface PostListPayload {
  list: Post[];
  series?: Series | null;
}

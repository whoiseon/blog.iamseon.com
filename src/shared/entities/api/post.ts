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
  seriesId: number | null;
  tags: string[];
}

export interface AddSeriesPayload {
  id: number;
  name: string;
}

export interface AddSeriesParams {
  name: string;
  urlSlug: string;
}

export interface SeriesListPayload {
  id: number;
  name: string;
  urlSlug: string;
  thumbnail: string | null;
  totalCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export * from './files';
export * from './series';
export * from './tag';
export * from './post';

export interface ApiPayload<T> {
  error: string;
  payload: T;
}

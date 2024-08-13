export * from './files';

export interface ApiPayload<T> {
  error: string;
  payload: T;
}

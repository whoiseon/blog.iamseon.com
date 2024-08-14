export * from './files';
export * from './series';

export interface ApiPayload<T> {
  error: string;
  payload: T;
}

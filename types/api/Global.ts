export interface Error {
  message: string;
  code: number;
}

export interface Pagination<T> {
  data: T;
  total: number;
  current_page: number;
  last_page: number;
}

export type Api<T> = Pagination<T> | T | null | Error;

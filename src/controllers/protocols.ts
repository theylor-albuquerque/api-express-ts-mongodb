export interface HttpResponse<T> {
  status_code: number;
  body: T | string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: any;
}

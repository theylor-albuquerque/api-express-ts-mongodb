export interface HttpResponse<T> {
  status_code: number;
  body: T | string;
}

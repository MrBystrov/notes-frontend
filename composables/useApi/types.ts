export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface UseApiOptions {
  method?: HttpMethod;
  body?: any; 
  headers?: Record<string, string>; 
}

export interface UseApiResponse<T> {
  data: Ref<T | null>;
  error: Ref<any>;
}
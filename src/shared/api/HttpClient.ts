import { AppError } from '#shared/errors/AppError';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  authenticated?: boolean;
}

export type AccessTokenProvider = () => Promise<string | null>;

export class HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly getAccessToken?: AccessTokenProvider,
  ) {}

  async request<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...options.headers,
    };

    if (options.authenticated !== false && this.getAccessToken) {
      const token = await this.getAccessToken();

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const init: RequestInit = {
      method: options.method ?? 'GET',
      headers,
    };

    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      throw new AppError(
        `Request failed with status ${response.status}`,
        'HTTP_ERROR',
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}

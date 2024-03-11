export interface NkRequestResponse<R> {
  status: number;
  statusText: string;
  message?: string;
  data?: R | null;
}

export interface NkRequestError {
  error: string;
  status: number;
  statusText: string;
  message?: string | null;
}

export interface INkError extends Error {
  details: NkRequestError;
}

export interface RequestsOptions {
  body?: URLSearchParams | string;
  method: string;
  headers: Record<string, string>;
}

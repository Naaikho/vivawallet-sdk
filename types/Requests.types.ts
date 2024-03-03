export interface NkRequestResponse {
  status: number;
  statusText: string;
  message?: string;
  data?: Record<string, any> | null;
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

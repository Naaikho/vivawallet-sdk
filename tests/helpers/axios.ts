import { vi } from 'vitest';
import { useAxios } from '../../src/utils/axiosInstance.ts';

export function mockAxios() {
  return {
    get: vi.spyOn(useAxios, 'get'),
    post: vi.spyOn(useAxios, 'post'),
    patch: vi.spyOn(useAxios, 'patch'),
    put: vi.spyOn(useAxios, 'put'),
    delete: vi.spyOn(useAxios, 'delete'),
    request: vi.spyOn(useAxios, 'request'),
  };
}

export function axiosResponse<T>(data: T, status = 200) {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
  };
}

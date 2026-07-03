import { describe, expect, it } from 'vitest';
import {
  querifyDatas,
  querifyDefinedDatas,
  withQuery,
} from '../../src/utils/functions.helpers';

describe('functions.helpers', () => {
  it('builds query strings', () => {
    expect(querifyDatas({ a: 'hello world', b: 2, c: true })).toBe(
      'a=hello%20world&b=2&c=true'
    );
    expect(querifyDefinedDatas({ a: 'x', b: undefined, c: null })).toBe('a=x');
    expect(withQuery('/path', { a: 'x' })).toBe('/path?a=x');
    expect(withQuery('/path', { a: undefined })).toBe('/path');
  });
});

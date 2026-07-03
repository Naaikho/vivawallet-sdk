import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  capitalize,
  isDev,
  isEgal,
  isEmpty,
  isInArray,
  isNumber,
  isValidJson,
  itemsIsInArray,
  makeUuid,
  objArrayToObj,
  querifyDatas,
  querifyDefinedDatas,
  replaceAll,
  replaceKeyByValue,
  validEmail,
  validNumber,
  validPassword,
  validStringLength,
  withQuery,
} from '../../src/utils/functions.helpers';

describe('functions.helpers', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('creates UUID v4 values', () => {
    expect(makeUuid()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  it('detects development mode from NODE_ENV', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(isDev()).toBe(true);

    vi.stubEnv('NODE_ENV', 'production');
    expect(isDev()).toBe(false);
  });

  it('validates string length boundaries', () => {
    expect(validStringLength('abc', 3, 5)).toBe(true);
    expect(validStringLength('ab', 3, 5)).toBe(false);
    expect(validStringLength('abcdef', 3, 5)).toBe(false);
  });

  it('validates numbers and numeric ranges', () => {
    expect(isNumber(12)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(false);
    expect(isNumber('12')).toBe(false);
    expect(validNumber(5, 1, 5)).toBe(true);
    expect(validNumber(0, 1, 5)).toBe(false);
    expect(validNumber(6, 1, 5)).toBe(false);
    expect(validNumber('5', 1, 5)).toBe(false);
  });

  it('validates password shape', () => {
    expect(validPassword('Password1')).toBe(true);
    expect(validPassword('password1')).toBe(false);
    expect(validPassword('PASSWORD1')).toBe(false);
    expect(validPassword('Password')).toBe(false);
    expect(validPassword('Pass1')).toBe(false);
  });

  it('validates email addresses', () => {
    expect(validEmail('user@example.com')).toBe(true);
    expect(validEmail('not-an-email')).toBe(false);
  });

  it('compares primitive and object values', () => {
    expect(isEgal('a', 'a')).toBe(true);
    expect(isEgal('1', 1)).toBe(false);
    expect(isEgal({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEgal({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('checks array inclusion', () => {
    expect(isInArray('a', ['a', 'b'])).toBe(true);
    expect(isInArray('c', ['a', 'b'])).toBe(false);
    expect(itemsIsInArray([], ['a'])).toBe(true);
    expect(itemsIsInArray(['a'], [])).toBe(false);
    expect(itemsIsInArray(['a', 'b'], ['a', 'b', 'c'])).toBe(true);
    expect(itemsIsInArray(['a', 'z'], ['a', 'b', 'c'])).toBe(false);
  });

  it('detects empty values without treating zero as empty', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(0)).toBe(false);
  });

  it('converts object arrays to keyed objects', () => {
    expect(objArrayToObj(null, 'id')).toEqual({});
    expect(objArrayToObj([], 'id')).toEqual({});
    expect(
      objArrayToObj(
        [
          { id: 'a', value: 1 },
          { id: 'b', value: 2 },
        ],
        'id'
      )
    ).toEqual({
      a: { id: 'a', value: 1 },
      b: { id: 'b', value: 2 },
    });
  });

  it('validates JSON strings', () => {
    expect(isValidJson('{"a":1}')).toBe(true);
    expect(isValidJson('{a:1}')).toBe(false);
  });

  it('formats and replaces strings', () => {
    expect(capitalize('viva')).toBe('Viva');
    expect(replaceAll('a-b-a', 'a', 'x')).toBe('x-b-x');
    expect(replaceKeyByValue('hello {{name}}', { name: 'viva' })).toBe(
      'hello viva'
    );
  });

  it('builds query strings', () => {
    expect(querifyDatas({ a: 'hello world', b: 2, c: true })).toBe(
      'a=hello%20world&b=2&c=true'
    );
    expect(querifyDefinedDatas({ a: 'x', b: undefined, c: null })).toBe('a=x');
    expect(withQuery('/path', { a: 'x' })).toBe('/path?a=x');
    expect(withQuery('/path', { a: undefined })).toBe('/path');
  });
});

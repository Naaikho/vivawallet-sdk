import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

/**
 * Make an uuid V4
 */
export function makeUuid(): string {
  return uuidv4();
}

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function validStringLength(
  str: string,
  min: number,
  max: number
): boolean {
  return str.length >= min && str.length <= max;
}

export function isNumber(item: any): item is number {
  return typeof item === 'number' && !isNaN(item);
}

/**
 * Check if item is a valid number between min and max
 */
export function validNumber(
  item: any,
  min: number,
  max: number
): item is number {
  return isNumber(item) && item >= min && item <= max;
}

export function validPassword(password: string): boolean {
  return (
    validStringLength(password, 8, 256) &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

export function validEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function isEgal(item1: any, item2: any): boolean {
  if (typeof item1 !== typeof item2) return false;
  if (typeof item1 === 'object')
    return isEgal(JSON.stringify(item1), JSON.stringify(item2));
  return item1 === item2;
}

export function isInArray(item: any, array: any[]): boolean {
  return array.includes(item);
}

export function itemsIsInArray(items: any[], array: any[]): boolean {
  if (!items.length) return true;
  if (!array.length) return false;
  return items.every((item) => isInArray(item, array));
}

export function isEmpty(item: any): boolean {
  if (typeof item === 'object') return !Object.keys(item).length;
  return !item && item !== 0;
}

export function objArrayToObj(
  array: Record<string, any>[] | null | undefined,
  key: string
): Record<string, any> {
  if (!array || !array.length) return {};
  let obj: Record<string, any> = {};
  array.forEach((item) => {
    obj[item[key]] = item;
  });
  return obj;
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Replace all `search` by `replace` in `str`
 */
export function replaceAll(
  str: string,
  search: string,
  replace: string
): string {
  return str.split(search).join(replace);
}

/**
 * Replace all `{{keys}}` by values in `str`
 */
export function replaceKeyByValue(
  str: string,
  datas: Record<string, any>
): string {
  Object.keys(datas).forEach((key) => {
    str = replaceAll(str, `{{${key}}}`, String(datas[key]));
  });
  return str;
}

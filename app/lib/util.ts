export const getDateString = (value = '', prevValue = '') => {
  if (prevValue.length > value.length) return value;

  const v = value
    .replace(/\D*/g, '')
    .replace(
      /^(\d{2})([2-9])/,
      (_m: string, s1: string, s2: string) => `${s1}0${s2}`
    )
    .replace(
      /^(\d{2})(1)([3-9])$/,
      (_m: string, s1: string, s2: string, s3: string) => `${s1}0${s2}${s3}`
    )
    .replace(/\w{2}/g, (s: string, i: number) => `${s}${i < 3 ? '.' : ''}`);

  return !v.endsWith('.') || v.slice(0, -1) !== prevValue ? v : prevValue;
};

export const getDateFullString = (value = '') => {
  return value
    .replace(/\./gi, '')
    .replace(
      /^(\d{2})(1[0-2]|0?[1-9])?([1-2]\d|3[0-1]|0?[1-9])?/,
      (_: string, $1: string, $2: string, $3: string) =>
        `${$1}.${$2?.padStart(2, '0') ?? ''}.${$3?.padStart(2, '0') ?? ''}`
    )
    .replace(/\.+$/, '');
};

export const validator = {
  blankOrNumber: (value?: number) => !value || !isNaN(value),
};

export const sleep = (time: number = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
  });

export const getErrorMessage = (e: unknown) =>
  (e && typeof e === 'object' && 'message' in e && e?.message) ?? '';

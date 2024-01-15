export const getDateString = (value = '', prevValue = '') => {
  console.log('call', value, prevValue);
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

  return v.slice(-1) !== '.' || v.slice(0, -1) !== prevValue ? v : prevValue;
};

export const getDateFullString = (value = '') => {
  return value
    .replace(
      /^(\d{2}\.)(\d)(\d)$/,
      (_m: string, s1: string, s2: string, s3: string) => `${s1}0${s2}.0${s3}`
    )
    .replace(
      /^(\d{2}\.)(\d{2}\.)(\d)$/,
      (_m: string, s1: string, s2: string, s3: string) => `${s1}${s2}0${s3}`
    );
};

export const validate = {
  blankOrNumber: (value?: number) => !value || !isNaN(value),
};

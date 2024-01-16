/* 계산 util */

import { $Enums } from '@prisma/client';

const division: { [key in $Enums.PeriodType]: number } = {
  DAY: 365,
  WEEK: Math.floor(365 / 7),
  MONTH: 12,
};

const getRealRate = (rate: number, type: $Enums.PeriodType): number => {
  return rate / (division[type] ?? 12);
};

const nanToZero = (num: number) => (isNaN(num) ? 0 : num);

/** common */
const getInterest = (
  quant: number,
  rate: number,
  period: number,
  option?: { end?: number; skip?: number; type?: $Enums.PeriodType }
): number => {
  const { end, skip = 0, type = 'MONTH' } = option || {};

  quant = nanToZero(quant);
  rate = nanToZero(rate);
  period = nanToZero(period);

  const oneRate = getRealRate(rate, type);

  let index = 0;
  let result = 0;

  while (index < period) {
    if (skip <= index && (!end || index < end)) {
      result += quant * oneRate * (period - index);
    }
    index++;
  }

  return result * 0.01;
};

type ResultFn = (
  quant: number,
  rate: number,
  period: number,
  type?: $Enums.PeriodType
) => number;

// 예금이자
export const getDepositResult: ResultFn = (
  quant, // 만원
  rate,
  period,
  type = 'MONTH'
) => getInterest(quant * 10000, rate, period, { end: 1, type });

// 적금이자
export const getSavingResult: ResultFn = (
  quant, // 만원
  rate,
  period,
  type = 'MONTH'
) => getInterest(quant * 10000, rate, period, { type });

export const getAfterTax = (quant: number): number => {
  return Math.round(quant * (1000 - 165)) / 1000;
};

export const getTextWithAfterTax = (interest?: number): string => {
  if (typeof interest === 'undefined') return '';

  return `세후이자: ${getAfterTax(interest).toLocaleString()}`;
};

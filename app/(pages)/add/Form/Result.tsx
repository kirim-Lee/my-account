'use client';

import { useFormContext } from 'react-hook-form';
import { FormType, valueAsNumber } from './type';
import DateController from '@/app/component/atom/DateController';
import React, { useMemo } from 'react';
import { getAfterTax, getTextWithAfterTax } from '@/app/lib/calculator';
import { Switch } from '@/app/component/show';

const Result = () => {
  const { control, register, watch } = useFormContext<FormType>();

  const interestQuant = watch().interestQuant;
  const totalOriginal = watch().quant;

  const interestQuantValue = useMemo(() => {
    return isNaN(Number(interestQuant))
      ? interestQuant
      : interestQuant.toLocaleString();
  }, [interestQuant]);

  return (
    <React.Fragment>
      <div className="wrap-input">
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="은행명"
            {...register('bank', { required: true })}
          />
        </div>

        <div className="wrap">
          <DateController<FormType>
            control={control}
            name="endDate"
            label="만기일"
          />
        </div>
      </div>
      <div className="wrap-input">
        <div className="wrap relative">
          <input
            type="text"
            className="text-input pr-10"
            placeholder="최종금액"
            {...register('quant', valueAsNumber)}
          />
          <span className="input-info-text">만원</span>
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="이자"
            disabled
            value={getTextWithAfterTax(interestQuant)}
          />
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="(세전)"
            {...register('interestQuant', {
              setValueAs: (value: string) =>
                Number(`${value ?? ''}`.replace(/,/gi, '')),
            })}
            value={interestQuantValue}
          />
        </div>
      </div>
      <div className="wrap-input">
        <div className="text-input-under text-right text-3xl">
          <Switch condition={interestQuant && totalOriginal}>
            <p>
              <span className="text-sm text-gray-400">
                (세전){' '}
                {(interestQuant + totalOriginal * 10000).toLocaleString()} 원
              </span>
              <span className="pl-2 text-lg text-violet-800">
                {(
                  getAfterTax(interestQuant ?? 0) +
                  totalOriginal * 10000
                ).toLocaleString()}{' '}
                <span className="text-sm">원</span>
              </span>
            </p>
            <p className="text-gray-500">예상 총 금액</p>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Result;

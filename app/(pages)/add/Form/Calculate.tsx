'use client';

import SwitchButton from '@/app/component/atom/SwitchButton';
import RadioGroup from '@/app/component/molecule/RadioGroup';
import {
  accountOptions,
  peridOptions,
  periodPlaceHolder,
} from '@/app/lib/options';

import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormType, valueAsNumber } from './type';
import { getDepositResult, getSavingResult } from '@/app/lib/calculator';
import dayjs from 'dayjs';

const Calculate = () => {
  const { control, register, watch, setValue, resetField } =
    useFormContext<FormType>();

  const { accountType, savingQuant, periodType, period, interest } = watch();

  // 이율계산
  useEffect(() => {
    if (!accountType) return;
    const fn = accountType === 'DEPOSIT' ? getDepositResult : getSavingResult;

    const interestQuant = fn(savingQuant, interest, period, periodType);

    if (interestQuant) setValue('interestQuant', interestQuant);
    else resetField('interestQuant');
  }, [
    accountType,
    savingQuant,
    periodType,
    period,
    interest,
    setValue,
    resetField,
  ]);

  // 총합계산
  useEffect(() => {
    if (
      accountType &&
      ((accountType === 'DEPOSIT' && savingQuant) || (savingQuant && period))
    ) {
      setValue(
        'quant',
        savingQuant * (accountType === 'DEPOSIT' ? 1 : period ?? 0)
      );
    } else {
      resetField('quant');
    }
  }, [accountType, period, savingQuant, setValue, resetField]);

  // 만기일계산
  useEffect(() => {
    const now = dayjs();
    if (!period || !periodType) return;

    setValue(
      'endDate',
      now
        .add(period, periodType.toLocaleLowerCase() as 'week' | 'month' | 'day')
        .format('YY.MM.DD')
    );
  }, [periodType, period, setValue, resetField]);

  return (
    <React.Fragment>
      <div className="mb-2">
        <Controller
          control={control}
          name="accountType"
          render={({ field }) => (
            <RadioGroup
              name={field.name}
              options={accountOptions}
              checked={field.value}
              onCheck={field.onChange}
            />
          )}
        />
      </div>

      <div className="wrap-input">
        <div className="wrap w-1/3 relative">
          <input
            type="text"
            className="text-input pr-10"
            placeholder="금액"
            {...register('savingQuant', valueAsNumber)}
          />
          <span className="input-info-text">만원</span>
        </div>

        <div className="wrap w-1/3 pl-10 relative">
          <div className="absolute left-0 top-0 h-full w-10 text-center p-1">
            <Controller
              control={control}
              name="periodType"
              render={({ field }) => (
                <SwitchButton
                  options={peridOptions}
                  checked={field.value}
                  onChange={field.onChange}
                  className="rounded-full bg-violet-300 block w-full h-full text-violet-700 text-sm -mr-1"
                />
              )}
            />
          </div>
          <input
            type="text"
            className="text-input"
            placeholder={periodPlaceHolder[watch().periodType]}
            {...register('period', valueAsNumber)}
          />
        </div>

        <div className="wrap w-1/3">
          <input
            type="text"
            className="text-input pr-7"
            placeholder="금리"
            {...register('interest', valueAsNumber)}
          />
          <span className="input-info-text">%</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Calculate;

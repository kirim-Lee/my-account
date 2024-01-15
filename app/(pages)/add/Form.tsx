'use client';

import SwitchButton from '@/app/component/atom/SwitchButton';
import RadioGroup from '@/app/component/molecule/RadioGroup';
import { $Enums } from '@prisma/client';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

interface FormType {
  accountType: $Enums.AccountType;
  periodType: $Enums.PeriodType;
  savingQuant: number;
  interestQuant: number;
  quant: number;
  period: number;
  interest: number;
  bank: string;
  startDate: string;
  endDate: string;
}

const accountOptions: Option<$Enums.AccountType>[] = [
  { label: '예금', value: 'DEPOSIT' },
  { label: '적금', value: 'SAVINGS' },
];

const peridOptions: Option<$Enums.PeriodType>[] = [
  { label: 'M', value: 'MONTH' },
  { label: 'D', value: 'DAY' },
  { label: 'W', value: 'WEEK' },
];

const periodPlaceHolder: { [value in $Enums.PeriodType]: string } = {
  MONTH: '개월',
  WEEK: '주',
  DAY: '일',
};

const Form = () => {
  const { control, register, formState, watch, getValues } = useForm<FormType>({
    defaultValues: { periodType: 'MONTH' },
  });

  console.log(watch());

  return (
    <React.Fragment>
      <h4 className="title h4">계산하기</h4>
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
            {...register('savingQuant', { valueAsNumber: true })}
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
            {...register('period', { valueAsNumber: true })}
          />
        </div>

        <div className="wrap w-1/3">
          <input
            type="text"
            className="text-input pr-7"
            placeholder="금리"
            {...register('interest', { valueAsNumber: true })}
          />
          <span className="input-info-text">%</span>
        </div>
      </div>
      <h4 className="title h4 mt-3">입력하기</h4>
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
          <input
            type="text"
            className="text-input"
            placeholder="만기일 YY.MM.DD"
            {...register('endDate', { required: true })}
          />
        </div>
      </div>
      <div className="wrap-input">
        <div className="wrap relative">
          <input
            type="text"
            className="text-input pr-10"
            placeholder="최종금액"
            {...register('quant', { required: true })}
          />
          <span className="input-info-text">만원</span>
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="이자"
            disabled
          />
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="(세전)"
            {...register('interestQuant', { required: true })}
          />
        </div>
      </div>
      <div className="wrap-input">
        <div className="wrap">
          <input
            type="text"
            className="text-input-under text-right text-3xl"
            placeholder="예상 총 금액"
            readOnly
          />
        </div>
      </div>
      <button type="submit" className="button full mt-2">
        등록하기
      </button>
    </React.Fragment>
  );
};

export default Form;

'use client';

import RadioGroup from '@/app/component/molecule/RadioGroup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type AccountType = 'SAVING' | 'DEPOSIT';

interface FormType {
  type: AccountType;
}

const options: Option<AccountType>[] = [
  { label: '예금', value: 'DEPOSIT' },
  { label: '적금', value: 'SAVING' },
];

const Form = () => {
  const { control, watch } = useForm<FormType>();

  return (
    <React.Fragment>
      <h4 className="title h4">계산하기</h4>
      <div className="mb-2">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <RadioGroup
              name={field.name}
              options={options}
              checked={field.value}
              onCheck={field.onChange}
            />
          )}
        />
      </div>

      <div className="wrap-input">
        <div className="wrap w-1/3">
          <input type="text" className="text-input" placeholder="금액" />
        </div>
        <div className="wrap w-1/3">
          <input type="text" className="text-input" placeholder="개월" />
        </div>
        <div className="wrap w-1/3">
          <input type="text" className="text-input pr-7" placeholder="금리" />
          <span className="input-info-text">%</span>
        </div>
      </div>
      <h4 className="title h4 mt-3">입력하기</h4>
      <div className="wrap-input">
        <div className="wrap">
          <input type="text" className="text-input" placeholder="은행명" />
        </div>
        <div className="wrap">
          <input
            type="text"
            className="text-input"
            placeholder="만기일 YY.MM.DD"
          />
        </div>
      </div>
      <div className="wrap-input">
        <div className="wrap">
          <input
            type="text"
            className="text-input pr-10"
            placeholder="최종금액"
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
          <input type="text" className="text-input" placeholder="(세전)" />
        </div>
      </div>
      <div className="wrap-input">
        <div className="wrap">
          <input
            type="text"
            className="text-input-under text-right text-3xl"
            placeholder="예상 총 금액"
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

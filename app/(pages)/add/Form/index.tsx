'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormType } from './type';
import Calculate from './Calculate';
import Result from './Result';

const Form = () => {
  const form = useForm<FormType>({ defaultValues: { periodType: 'MONTH' } });
  const { control, register, watch } = form;

  return (
    <React.Fragment>
      <FormProvider {...form}>
        <h4 className="title h4">계산하기</h4>
        <Calculate />

        <h4 className="title h4 mt-3">입력하기</h4>
        <Result />

        <button type="submit" className="button full mt-2">
          등록하기
        </button>
      </FormProvider>
    </React.Fragment>
  );
};

export default Form;

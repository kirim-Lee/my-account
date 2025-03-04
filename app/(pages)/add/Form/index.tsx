'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormType } from './type';
import Calculate from './Calculate';
import Result from './Result';
import dayjs from 'dayjs';

const Form = () => {
  const form = useForm<FormType>({ defaultValues: { periodType: 'MONTH' } });

  const onValid = (values: FormType) => {
    const { endDate, startDate, accountType, ...rest } = values;

    return fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify({
        ...rest,
        type: accountType,
        startDate: dayjs().toDate(),
        endDate: dayjs('20' + endDate.replace('.', '-')).toDate(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onValid)}>
        <h4 className="title h4">계산하기</h4>
        <Calculate />

        <h4 className="title h4 mt-3">입력하기</h4>
        <Result />

        <button
          type="submit"
          className="button full mt-2"
          disabled={form.formState.isSubmitting}
        >
          등록하기
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;

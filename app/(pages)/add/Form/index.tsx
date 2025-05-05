'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormType } from './type';
import Calculate from './Calculate';
import Result from './Result';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import { getAccount } from '@/app/lib/queries/queryOptions';

const Form = () => {
  const queryClient = useQueryClient();

  const form = useForm<FormType>({
    defaultValues: {
      periodType: 'MONTH',
      startDate: dayjs().format('YY.MM.DD'),
    },
  });

  const onValid = async (values: FormType) => {
    const { endDate, startDate, accountType, ...rest } = values;

    return fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify({
        ...rest,
        type: accountType,
        startDate: dayjs('20' + startDate.replace(/\./gi, '-')).endOf('d'),
        endDate: dayjs('20' + endDate.replace(/\./gi, '-')).endOf('d'),
      }),
    })
      .then((res) => res.json())
      .then((_) => {
        console.log(_);
        form.reset();
        queryClient.invalidateQueries(getAccount());
      })
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

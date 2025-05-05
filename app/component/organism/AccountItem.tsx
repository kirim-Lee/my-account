'use client';

import { BankAccountResponse } from '@/app/@types/extends';
import { fetcher } from '@/app/lib/queries/fetcher';
import { getAccount } from '@/app/lib/queries/queryOptions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

interface Props {
  account: BankAccountResponse;
}

const filterList = <T extends { id: number }>(id: number, arr: T[]): T[] =>
  arr.filter((item) => item.id !== id);

const AccountItem = ({ account }: Props) => {
  const queryClient = useQueryClient();

  const optimisticDelete = useCallback(
    (id: number) => {
      const oldData = queryClient.getQueryData(getAccount().queryKey);
      queryClient.setQueryData(getAccount().queryKey, (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, account: filterList(id, oldData.account ?? []) };
      });
      return oldData;
    },
    [queryClient]
  );

  const { mutate } = useMutation({
    mutationKey: ['account'],
    mutationFn: async (id: number) =>
      fetcher('/api/account', {
        method: 'delete',
        body: JSON.stringify({ id }),
      }),
    onMutate: optimisticDelete,
    onError(_, __, context) {
      queryClient.setQueryData(getAccount().queryKey, context);
    },
  });

  return (
    <div className="flex group gap-1">
      <p>
        *{' '}
        {[
          dayjs(new Date(account.endDate)).format('YY.MM.DD'),
          account.quant.toLocaleString(),
          account.bank?.name ?? '-',
        ].join(' / ')}
      </p>
      <button className="hidden group-hover:block">✏️</button>
      <button
        className="hidden group-hover:block"
        onClick={() => mutate(account.id)}
      >
        ❌
      </button>
    </div>
  );
};

export default AccountItem;

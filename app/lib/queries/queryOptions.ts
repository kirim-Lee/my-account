import { queryOptions } from '@tanstack/react-query';
import { fetcher } from './fetcher';
import { BankAccountResponse } from '@/app/@types/extends';

export const getAccount = (cookie?: string | null) =>
  queryOptions({
    queryKey: ['account'],
    queryFn: async (): Promise<{
      ok: boolean;
      account?: BankAccountResponse[];
      message?: string;
    }> => {
      return await fetcher('/api/account', cookie);
    },
  });

import { queryOptions } from '@tanstack/react-query';
import { fetcher } from './fetcher';
import { BankAccountResponse } from '@/app/@types/extends';

const getHeaderFromCookie = (cookie?: string | null, init?: RequestInit) => {
  return {
    ...init,
    ...(cookie ? { headers: { cookie, ...init?.headers } } : {}),
  };
};

export const getAccount = (cookie?: string | null) =>
  queryOptions({
    queryKey: ['account'],
    queryFn: async () => {
      return await fetcher<{ account: BankAccountResponse[] }>(
        '/api/account',
        getHeaderFromCookie(cookie)
      );
    },
  });

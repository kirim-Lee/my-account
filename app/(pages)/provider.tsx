'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '../lib/queries/getQueryClient';

interface Props {
  session: Session | null;
  children: React.ReactNode;
}
const Provider = ({ session, children }: Props) => {
  const queryClient = getQueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;

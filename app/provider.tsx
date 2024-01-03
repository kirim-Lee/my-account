'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface Props {
  session: Session | null;
  children: React.ReactNode;
}
const Provider = ({ session, children }: Props) => {
  console.log(session);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from './provider';
import { getSession } from '../lib/authOption';
import { Suspense } from 'react';
import { CenterLoading } from '../component/atom/Loading';

import '../globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface Props {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<CenterLoading />}>
          <Provider session={session}>{children}</Provider>
        </Suspense>
      </body>
    </html>
  );
}

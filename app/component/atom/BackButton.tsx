'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export const BackButton = ({
  children,
  ...attr
}: ChildProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} {...attr}>
      {children}
    </button>
  );
};

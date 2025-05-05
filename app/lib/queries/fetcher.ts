import { isServer } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export const fetcher = async (url: string, cookie?: string | null) => {
  const result = await fetch(
    isServer ? `http://localhost:3000${url}` : url,
    cookie ? { headers: { cookie } } : {}
  );

  if (result.status === 401 && isServer) {
    redirect('/login');
  }

  return result.json().catch(() => ({ ok: false, message: 'JSON 변환 문제' }));
};

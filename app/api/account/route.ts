import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/authOption';
import prisma from '@/app/lib/client';

export const GET = async (request: Request) => {
  const session = await getSession();
  const userId = session?.user?.id;
  try {
    if (!userId) {
      throw Error('로그인 후 접근하세요');
    }

    const account = await prisma.bankAccount.findMany({ where: { userId } });

    return NextResponse.json({ ok: true, account });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ ok: false });
  }
};

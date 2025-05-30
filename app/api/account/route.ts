import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/authOption';
import prisma from '@/app/lib/client';
import { BankAccount } from '@prisma/client';
import { getErrorMessage } from '@/app/lib/util';

export const GET = async (_request: Request) => {
  console.log(_request, 'request1234567890', _request.headers);

  const session = await getSession();

  const userId = session?.user?.id;

  try {
    if (!userId) {
      return NextResponse.json(
        { ok: false, message: '로그인 후 접근하세요' },
        { status: 401 }
      );
    }

    const account = await prisma.bankAccount.findMany({
      where: { userId },
      include: { bank: { select: { name: true } } },
    });

    return NextResponse.json({ ok: true, account });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ ok: false, message: getErrorMessage(e) });
  }
};

export const POST = async (request: Request) => {
  const session = await getSession();
  const userId = session?.user?.id;
  try {
    if (!userId) {
      throw Error('로그인 후 접근하세요.');
    }

    const {
      bank: bankName,
      userId: _userId,
      id: _id,
      bankId,
      ...rest
    }: BankAccount & { bank: string } = await request.json();

    const bank = await prisma.bank.upsert({
      where: { name: bankName },
      update: { name: bankName },
      create: { name: bankName },
    });

    const account = await prisma.bankAccount.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
        bank: { connect: { id: bank.id } },
      },
    });

    return NextResponse.json({ ok: true, account });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      ok: false,
      error: e && typeof e === 'object' && 'message' in e && e.message,
    });
  }
};

export const DELETE = async (request: Request) => {
  const session = await getSession();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      throw Error('로그인 후 접근하세요.');
    }

    const { id }: { id: number } = await request.json();

    const account = await prisma.bankAccount.delete({ where: { id } });

    return NextResponse.json({ ok: true, account });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      ok: false,
      error: e && typeof e === 'object' && 'message' in e && e.message,
    });
  }
};

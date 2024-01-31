import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const session = await getSession();

    return NextResponse.json({ ok: true, session });
  } catch (e) {
    console.log('error', e);

    return NextResponse.json(
      {
        ok: false,
        message: e && typeof e === 'object' && 'message' in e && e?.message,
      },
      { status: 500 }
    );
  }
};

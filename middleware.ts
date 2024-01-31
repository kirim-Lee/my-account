import { Session } from '@prisma/client';
import { NextResponse } from 'next/server';

export const middleware = async (request: Request) => {
  try {
    const res = await fetch(
      `http://${request.headers.get('host')}/api/session`,
      { headers: request.headers }
    );
    const { session } = (await res.json()) as { session?: Session };

    console.log(session);

    if (!session?.userId) {
      return NextResponse.redirect(
        `http://${request.headers.get('host')}/login`
      );
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/list/:path*'],
};

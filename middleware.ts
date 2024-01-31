import { NextResponse } from 'next/server';
import { Session } from 'next-auth';

export const middleware = async (request: Request) => {
  try {
    const res = await fetch(
      `http://${request.headers.get('host')}/api/session`,
      { headers: request.headers }
    );

    const { session } = (await res.json()) as { session?: Session };

    if (!session?.user.id) {
      return NextResponse.redirect(
        `http://${request.headers.get('host')}/login`
      );
    }
  } catch (e) {
    console.log('error middleware', e);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/list/:path*'],
};

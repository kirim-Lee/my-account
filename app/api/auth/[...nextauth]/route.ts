import nextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/app/lib/client';
import { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_PASSWORD ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? 'candy',
  callbacks: {
    async session({ session, user }) {
      session.user = user;
      return Promise.resolve(session);
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
};

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };

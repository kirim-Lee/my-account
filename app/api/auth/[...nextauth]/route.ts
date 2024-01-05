import nextAuth from 'next-auth';
import { authOptions } from '@/app/lib/authOption';

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };

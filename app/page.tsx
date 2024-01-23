'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Switch } from './component/show';

export default function Home() {
  const session = useSession();

  const handleLogin = () => signIn('google');
  const handleLogout = () => signOut();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      <Switch condition={session.data?.user}>
        <button onClick={handleLogout}>logout</button>
        <button onClick={handleLogin}>login</button>
      </Switch>
    </main>
  );
}

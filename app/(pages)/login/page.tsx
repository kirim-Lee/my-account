'use client';

import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div>
      로그인해주세요
      <button onClick={() => signIn('google')}>구글로 로그인하기</button>
    </div>
  );
};

export default Login;

import { headers } from 'next/headers';
import AccountList from '../component/organism/AccountList';
import { Switch } from '../component/show';
import { redirect } from 'next/navigation';
import { BankAccountResponse } from '../@types/extends';

export default async function Home() {
  const res = await fetch(`http://${headers().get('host')}/api/account`, {
    headers: headers(),
  });

  if (res.status === 401) redirect('/login');

  const result: {
    ok: boolean;
    account?: BankAccountResponse[];
    message?: string;
  } = await Promise.resolve(res.json()).catch((e) => {
    console.log(e);
  });

  return (
    <main className="flex min-h-screen flex-col p-10">
      <h1 className="text-lg font-semibold p-4 rounded-full bg-slate-50 ">
        예/적금목록
      </h1>
      <Switch condition={!result.ok}>
        <div>
          <Switch condition={result.message}>
            {result.message}
            에러로 조회되지 않았습니다. 다시 시도해 주세요.
          </Switch>
        </div>
        <AccountList accounts={result.account ?? []} />
      </Switch>
    </main>
  );
}

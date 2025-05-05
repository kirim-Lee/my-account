import AccountList from '../component/organism/AccountList';
import { Switch } from '../component/show';
import { getQueryClient } from '../lib/queries/getQueryClient';
import { getAccount } from '../lib/queries/queryOptions';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';

export default async function Home() {
  const queryClient = getQueryClient();

  const result = await queryClient
    .fetchQuery(getAccount(headers().get('cookie')))
    .catch((e) => {
      console.log(e);
    });

  if (!result) return null;

  return (
    <main className="flex min-h-screen flex-col p-10">
      <h1 className="text-lg font-semibold p-4 rounded-full bg-slate-50 ">
        예/적금목록
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Switch condition={!result.ok}>
          <div>
            <Switch condition={result.message}>
              {result.message}
              에러로 조회되지 않았습니다. 다시 시도해 주세요.
            </Switch>
          </div>
          <AccountList />
        </Switch>
      </HydrationBoundary>
    </main>
  );
}

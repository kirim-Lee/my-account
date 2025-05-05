'use client';

import { groupBy } from '@/app/lib/sorter';
import dayjs from 'dayjs';
import Show from '../show';
import AccountItem from './AccountItem';
import { BankAccountResponse } from '@/app/@types/extends';
import React from 'react';
import { getGridColSpan } from '@/app/lib/style';
import { sum } from '@/app/lib/calculator';
import { extractProperties, filter, isPastYear } from '@/app/lib/util';
import Link from 'next/link';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getAccount } from '@/app/lib/queries/queryOptions';

const getRangeArray = (num: number, add: number = 0): number[] =>
  Array.from(new Array(num)).map((_, m) => m + add);

const getMinMax = (...nums: number[]): [min: number, max: number] => {
  return [Math.min(...nums), Math.max(...nums)];
};

const months = getRangeArray(12, 1);

const AccountList = () => {
  const { data: { account: accounts = [] } = {} } = useQuery(getAccount());

  if (!accounts.length) return null;

  const yearGrouped = groupBy(accounts, 'endDate', (keyId) =>
    dayjs(keyId).get('year')
  );
  const [minYear, maxYear] = getMinMax(...yearGrouped.keys());
  const yearGap = maxYear - minYear + 1;
  const years = getRangeArray(yearGap, minYear);

  const groupedByYM = groupBy(
    accounts,
    'endDate',
    (keyId) => `${dayjs(keyId).get('year')}.${dayjs(keyId).get('month') + 1}`
  );

  const groupedByMonth = groupBy(accounts, 'endDate', (keyId) =>
    dayjs(keyId).get('month')
  );

  const groupedByYear = groupBy(accounts, 'endDate', (keyId) =>
    dayjs(keyId).get('year')
  );

  const wholeRange = months
    .map((month) => years.map((year) => `${year}.${month}`))
    .flat();

  const getMonth = (index: number): number => Math.floor(index / yearGap);

  return (
    <div className="relative">
      <div className="p-2 text-right relative">
        <span className="text-white bg-blue-400 rounded-full inline-block py-1 px-3">
          {getSum(filter(accounts, (item) => !isPastYear(item.endDate)))}
        </span>
      </div>
      <div className="flex">
        <Link
          href="/add"
          className="text-blue-600 text-sm border-blue-400 border-b-1 py-2 rounded-full"
        >
          등록하기
        </Link>
      </div>
      <h2>Todos:</h2>
      <p>option</p>
      <p>tab</p>
      <p>react-query 연동</p>
      {'// 리스트'}
      <div
        className="grid grid-flow-row-dense auto-rows-max auto-cols-max gap-2 bg-white p-10 rounded-2xl"
        style={{
          gridTemplateColumns: `50px repeat(${yearGap + 1}, minmax(0, 1fr))`,
        }}
      >
        {/**header */}
        <h3> </h3>

        {years.map((year) => (
          <h3
            key={year}
            className="text-indigo-600 text-sm border-b-cyan-400 border-b-2 py-2"
          >
            {year}년
          </h3>
        ))}
        <h3 className="text-indigo-600 text-sm border-blue-400 border p-2 bg-blue-50 rounded-2xl text-right ">
          월별 통계
        </h3>

        {/** content */}
        {wholeRange.map((keyId, index) => (
          <React.Fragment key={keyId}>
            <Show active={!(index % yearGap)}>
              {/** line */}
              <Show active={index}>
                <div
                  className="border-b border-b-gray-100"
                  style={getGridColSpan(yearGap + 2)}
                />
              </Show>

              <div>
                <h4 className="rounded-full bg-blue-400 text-xs text-white text-center h-10 w-10 py-2.5">
                  {getMonth(index) + 1}월
                </h4>
              </div>
            </Show>
            <div className="text-xs text-gray-600 p-2 ">
              <Show active={groupedByYM.get(keyId)}>
                {groupedByYM.get(keyId)?.map((account) => (
                  <AccountItem key={account.id} account={account} />
                ))}
              </Show>
            </div>
            <Show active={!((index + 1) % yearGap)}>
              <div className="text-xs text-gray-600 p-2 text-right">
                총 {getSum(groupedByMonth.get(getMonth(index)) ?? [])} 만원
                <br />
                지난해 제외{' '}
                {getSum(
                  filter(
                    groupedByMonth.get(getMonth(index)) ?? [],
                    (item) => !isPastYear(item.endDate)
                  )
                )}
              </div>
            </Show>
          </React.Fragment>
        ))}

        {/** total by year */}
        <div
          className="border-b border-b-gray-100"
          style={getGridColSpan(yearGap + 2)}
        />
        <div>
          <h4 className="rounded-full text-blue-600 text-sm border-blue-400 bg-blue-50 border text-center h-10 w-10 py-2.5">
            합계
          </h4>
        </div>
        {years.map((year) => (
          <div className="text-xs text-gray-600 p-2 " key={year}>
            {year}:{' '}
            <span className="text-sm text-orange-500">
              {getSum(groupedByYear.get(year) ?? [])}
            </span>{' '}
            만원
          </div>
        ))}
        <div className="text-xs text-gray-600 p-2 text-right">
          총 <span className="text-sm text-orange-500">{getSum(accounts)}</span>{' '}
          만원
          <br />
          지난해 제외{' '}
          <span className="text-gray-600">
            {getSum(filter(accounts, (item) => !isPastYear(item.endDate)))}
          </span>
        </div>
      </div>
    </div>
  );
};

const getSum = (accounts: BankAccountResponse[]) =>
  sum(extractProperties(accounts, 'quant')).toLocaleString();

export default AccountList;

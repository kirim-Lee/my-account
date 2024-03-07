import { groupBy } from '@/app/lib/sorter';
import dayjs from 'dayjs';
import Show from '../show';
import AccountItem from './AccountItem';
import { BankAccountResponse } from '@/app/@types/extends';
import React from 'react';
import { getGridColSpan } from '@/app/lib/style';
import { sum } from '@/app/lib/calculator';
import { extractProperties, filter, isPastYear } from '@/app/lib/util';

interface Props {
  accounts: BankAccountResponse[];
}

const getRangeArray = (num: number, add: number = 0): number[] =>
  Array.from(new Array(num)).map((_, m) => m + add);

const getMinMax = (...nums: number[]): [min: number, max: number] => {
  return [Math.min(...nums), Math.max(...nums)];
};

const months = getRangeArray(12, 1);

const AccountList = ({ accounts }: Props) => {
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

  const wholeRange = months
    .map((month) => years.map((year) => `${year}.${month}`))
    .flat();

  const getMonth = (index: number): number => Math.floor(index / yearGap);

  return (
    <div className="relative">
      <h2>Todos:</h2>
      <p>option</p>
      <p>total</p>
      <p>tab</p>
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
                총 {getSum(groupedByMonth.get(getMonth(index)) ?? [])} 원<br />
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
      </div>
    </div>
  );
};

const getSum = (accounts: BankAccountResponse[]) =>
  sum(extractProperties(accounts, 'quant')).toLocaleString();

export default AccountList;

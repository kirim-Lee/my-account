import { groupBy } from '@/app/lib/sorter';
import dayjs from 'dayjs';
import Show from '../show';
import AccountItem from './AccountItem';
import { BankAccountResponse } from '@/app/@types/extends';
import React from 'react';
import { getGridColSpan } from '@/app/lib/style';

interface Props {
  accounts: BankAccountResponse[];
}

const getRangeArray = (num: number, add: number = 0): number[] =>
  Array.from(new Array(num)).map((_, m) => m + add);

const getRange = (nums: number[]): [min: number, max: number] => {
  return [Math.min(...nums), Math.max(...nums)];
};

const months = getRangeArray(12, 1);

const AccountList = ({ accounts }: Props) => {
  const yearGrouped = groupBy(accounts, 'endDate', (keyId) =>
    dayjs(keyId).get('year')
  );
  const [minYear, maxYear] = getRange([...yearGrouped.keys()]);
  const yearGap = maxYear - minYear + 1;
  const years = getRangeArray(yearGap, minYear);

  const grouped = groupBy(
    accounts,
    'endDate',
    (keyId) => `${dayjs(keyId).get('year')}.${dayjs(keyId).get('month') + 1}`
  );

  const wholeRange = months
    .map((month) => years.map((year) => `${year}.${month}`))
    .flat();

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
          gridTemplateColumns: `50px repeat(${yearGap}, minmax(0, 1fr))`,
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

        {/** content */}
        {wholeRange.map((keyId, index) => (
          <React.Fragment key={keyId}>
            <Show active={!(index % yearGap)}>
              <Show active={index}>
                <div
                  className="border-b border-b-gray-100"
                  style={getGridColSpan(yearGap + 1)}
                />
              </Show>

              <div>
                <h4 className="rounded-full bg-blue-400 text-xs text-white text-center h-10 w-10 py-2.5">
                  {Math.floor(index / yearGap) + 1}월
                </h4>
              </div>
            </Show>
            <div className="text-xs text-gray-600 p-2 ">
              <Show active={grouped.get(keyId)}>
                {grouped.get(keyId)?.map((account) => (
                  <AccountItem key={account.id} account={account} />
                ))}
              </Show>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AccountList;

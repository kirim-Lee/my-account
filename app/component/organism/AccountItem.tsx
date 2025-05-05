'use client';

import { BankAccountResponse } from '@/app/@types/extends';
import dayjs from 'dayjs';

interface Props {
  account: BankAccountResponse;
}

const AccountItem = ({ account }: Props) => {
  console.log(account);
  return (
    <div className="flex group gap-1">
      <p>
        *{' '}
        {[
          dayjs(new Date(account.endDate)).format('YY.MM.DD'),
          account.quant.toLocaleString(),
          account.bank?.name ?? '-',
        ].join(' / ')}
      </p>
      <button className="hidden group-hover:block">✏️</button>
      <button
        className="hidden group-hover:block"
        onClick={() =>
          fetch('/api/account', {
            method: 'delete',
            body: JSON.stringify({ id: account.id }),
          })
        }
      >
        ❌
      </button>
    </div>
  );
};

export default AccountItem;

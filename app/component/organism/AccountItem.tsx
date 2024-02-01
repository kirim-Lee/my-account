import { BankAccountResponse } from '@/app/@types/extends';
import dayjs from 'dayjs';

interface Props {
  account: BankAccountResponse;
}

const AccountItem = ({ account }: Props) => {
  return (
    <p>
      {[
        dayjs(account.endDate).format('YY.MM.DD'),
        account.quant,
        account.bank?.name ?? '-',
      ].join(' / ')}
    </p>
  );
};

export default AccountItem;

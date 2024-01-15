import { $Enums } from '@prisma/client';

export const accountOptions: Option<$Enums.AccountType>[] = [
  { label: '예금', value: 'DEPOSIT' },
  { label: '적금', value: 'SAVINGS' },
];

export const peridOptions: Option<$Enums.PeriodType>[] = [
  { label: 'M', value: 'MONTH' },
  { label: 'D', value: 'DAY' },
  { label: 'W', value: 'WEEK' },
];

export const periodPlaceHolder: { [value in $Enums.PeriodType]: string } = {
  MONTH: '개월',
  WEEK: '주',
  DAY: '일',
};

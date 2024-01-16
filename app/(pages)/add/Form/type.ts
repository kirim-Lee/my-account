import { validator } from '@/app/lib/util';
import { $Enums } from '@prisma/client';

export interface FormType {
  accountType: $Enums.AccountType;
  periodType: $Enums.PeriodType;
  savingQuant: number;
  interestQuant: number;
  quant: number;
  period: number;
  interest: number;
  bank: string;
  startDate: string;
  endDate: string;
}

export const valueAsNumber = {
  valueAsNumber: true,
  validate: validator.blankOrNumber,
};

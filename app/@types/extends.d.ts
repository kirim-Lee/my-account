// schema extends

import { BankAccount } from '@prisma/client';

type BankAccountResponse = BankAccount & { bank?: { name: string } };

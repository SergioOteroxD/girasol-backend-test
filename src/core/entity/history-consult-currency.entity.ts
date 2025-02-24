import { Ecurrency } from '../../commons/enum/currency.enum';
export interface IhistoryConsultCurrency {
  userId: string;

  from: Ecurrency;

  to: Ecurrency;

  amount: number;

  rate: number;
}

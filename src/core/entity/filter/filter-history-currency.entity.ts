import { Ecurrency } from '../../../commons/enum/currency.enum';
export interface IfilterHistoryCurrency {
  userId: string;
  from: Ecurrency;
  to: Ecurrency;
}

import { Ecurrency } from '../../../commons/enum/currency.enum';
export interface IconversionData {
  from: Ecurrency;
  to: Ecurrency;
  amount: number;
}

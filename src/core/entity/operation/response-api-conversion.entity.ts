import { Ecurrency } from '../../../commons/enum/currency.enum';
export interface IresponseApiConversion {
  base: string;
  result: {
    [currency in Ecurrency]: number;
  };
  updated: Date;
  ms: number;
}

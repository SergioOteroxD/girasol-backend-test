import { EcurrencyEvent } from '../../../enum/conversion-currency.event';

export interface IeventBase<T = any> {
  readonly userId: string;
  readonly event: EcurrencyEvent;
  readonly data?: T;
}

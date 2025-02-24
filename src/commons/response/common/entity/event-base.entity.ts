import { EcurrencyEvent } from '../../../enum/currency.event';

export interface IeventBase<T = any> {
  readonly userId: string;
  readonly event: EcurrencyEvent;
  readonly data?: T;
}

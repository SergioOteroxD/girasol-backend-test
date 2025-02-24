import { Injectable } from '@nestjs/common';
import { EcurrencyEvent } from '../commons/enum/conversion-currency.event';

@Injectable()
export abstract class IeventDriver {
  /**
   * Emite un evento en el sistema
   */
  abstract emit<T = any>(
    event: EcurrencyEvent,
    userId: string,
    payload?: T,
  ): boolean;
}

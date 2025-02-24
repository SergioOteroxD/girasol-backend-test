import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IeventDriver } from '../event.driver';
import { CustomLogger } from '../../commons/util/logger';
import { EcurrencyEvent } from '../../commons/enum/conversion-currency.event';
import { IeventBase } from '../../commons/response/common/entity/event-base.entity';

@Injectable()
export class EventDriver implements IeventDriver {
  constructor(private eventEmitter: EventEmitter2) {}

  private readonly logger = CustomLogger.getInstance();
  emit<T = any>(event: EcurrencyEvent, userId: string, data?: T): boolean {
    const payload: IeventBase = { userId, event, data };
    try {
      return this.eventEmitter.emit(event, payload);
    } catch (error) {
      this.logger.error(`Error emitiendo evento ${event}`, { payload, error }, [
        'EventDriver.emit',
      ]);
      return false;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { IhistoryConsultCurrencyDriver } from '../../../drivers/history-consult-currency';
import { IeventConsultConversionUC } from '../event-consult-conversion.uc';

@Injectable()
export class EventConsultConversionUC implements IeventConsultConversionUC {
  constructor(private historyConsult: IhistoryConsultCurrencyDriver) {}

  async event(data: any): Promise<any> {
    await this.historyConsult.register({
      userId: data.userId,
      amount: data.amount,
      from: data.from,
      to: data.to,
      rate: data.rate,
    });
  }
}

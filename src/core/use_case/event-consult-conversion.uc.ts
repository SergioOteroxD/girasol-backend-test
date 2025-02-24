import { IhistoryConsultCurrency } from '../entity/history-consult-currency.entity';

export abstract class IeventConsultConversionUC {
  abstract event(payload: IhistoryConsultCurrency): Promise<any>;
}

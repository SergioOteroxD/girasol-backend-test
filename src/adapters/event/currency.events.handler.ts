import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomLogger } from '../../commons/util/logger';
import { IhistoryConsultCurrency } from '../../core/entity/history-consult-currency.entity';
import { EcurrencyEvent } from '../../commons/enum/conversion-currency.event';
import { IeventBase } from '../../commons/response/common/entity/event-base.entity';
import { IeventConsultConversionUC } from '../../core/use_case/event-consult-conversion.uc';

@Injectable()
export class CurrencyEventListener {
  constructor(private eventConsultCurrency: IeventConsultConversionUC) {
    // private eventIncAssociation: IeventIncAssociationUC, // private eventRegisterMaterialRecovery: IeventRegisterMaterialRecoveryUC,
  }

  private readonly logger = CustomLogger.getInstance();

  @OnEvent(EcurrencyEvent.QUERY_CURRENCY, { async: true })
  async handleConsultCurrency(event: IeventBase<IhistoryConsultCurrency>) {
    this.logger.info('Se recibe evento.', event.userId, ['event', event.event]);
    this.eventConsultCurrency.event(event.data);
  }
}

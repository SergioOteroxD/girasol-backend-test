import { Injectable } from '@nestjs/common';
import {
  ResponseBase,
  IresponseBase,
} from '../../../commons/response/common/entity/response-base.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { IqueryConversionUC } from '../query-conversion.uc';
import { IconversionData } from '../../entity/operation/conversion.entity';
import { IconversionDriver } from '../../../drivers/conversion.driver';
import { IuserContext } from '../../entity/user-context.entity';
import { IredisDriver } from '../../../drivers/redis.driver';
import { CustomException } from '../../../commons/response/common/entity/custom-exception.model';
import { IeventDriver } from '../../../drivers/event.driver';
import { EcurrencyEvent } from 'src/commons/enum/conversion-currency.event';
import { IhistoryConsultCurrency } from '../../entity/history-consult-currency.entity';

@Injectable()
export class QueryConversionUC implements IqueryConversionUC {
  constructor(
    private conversionDriver: IconversionDriver,
    private redisDriver: IredisDriver,
    private eventDriver: IeventDriver,
  ) {}

  async getOne(
    data: IconversionData,
    user: IuserContext,
  ): Promise<IresponseBase<any>> {
    try {
      let rate: number;
      const conversionCache = await this.redisDriver.getValue(
        `consult.${data.from}.${data.to}`,
      );
      if (conversionCache) {
        rate = conversionCache.result[data.to];
      } else {
        const conversionConsult = await this.conversionDriver.convert({
          from: data.from,
          to: data.to,
        });
        if (!conversionConsult)
          return new ResponseBase(RESPONSE_CODE.NOT_FOUND);
        await this.redisDriver.setValue(
          `consult.${data.from}.${data.to}`,
          conversionConsult,
        );
        rate = conversionConsult.result[data.to];
      }

      this.eventDriver.emit<IhistoryConsultCurrency>(
        EcurrencyEvent.QUERY_CURRENCY,
        user.userId,
        { ...data, rate, userId: user.userId },
      );
      return new ResponseBase(RESPONSE_CODE.QUERY_OK, {
        result: rate * data.amount,
      });
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'QueryConversionUC.getOne',
        'Technical',
        error,
      );
    }
  }
}

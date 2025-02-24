import { IresponseApiConversion } from '../core/entity/operation/response-api-conversion.entity';
export abstract class IconversionDriver {
  abstract convert(data: {
    from: string;
    to: string;
  }): Promise<IresponseApiConversion>;
}

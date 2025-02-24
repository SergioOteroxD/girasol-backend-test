import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { CustomLogger } from '../../commons/util/logger';
import { IconversionDriver } from '../conversion.driver';

@Injectable()
export class ConversionDriver implements IconversionDriver {
  private readonly logger = CustomLogger.getInstance();
  constructor(private configService: ConfigService) {}

  async convert(consultData: any): Promise<any> {
    try {
      const url = this.configService.get<string>('apis.api_url_fast_forest');
      const api_key = this.configService.get<string>(
        'apis.api_key_fast_forest',
      );

      const { data } = await axios.get(`${url}/fetch-one`, {
        params: { ...consultData, api_key: api_key },
      });
      this.logger.debug('Result send consult conversion fast forest.', data, [
        'EXTERNAL',
        'FAST_FORREST',
      ]);
      return data;
    } catch (error) {
      this.logger.error('Error sending consult fast forest.', error?.message, [
        'EXTERNAL',
        'FAST_FORREST',
      ]);
    }
  }
}

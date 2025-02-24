import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseHttp } from '../../commons/response/common/entity/response-http.model';
import { AuthJwtGuard } from '../guard/jwt.guard';
import { DuserContext } from '../decorator/user-context.decorator';
import { IuserContext } from '../../core/entity/user-context.entity';
import { IqueryConversionUC } from 'src/core/use_case/query-conversion.uc';
import { QueryConversionOneDto } from '../dto/query-conversion-one.dto';
import { IqueryHistoryCurrencyUC } from '../../core/use_case/query-history-conversion.uc';
import { Ecurrency } from '../../commons/enum/currency.enum';

@Controller('currency')
@UseGuards(AuthJwtGuard)
export class CurrencyController {
  constructor(
    private queryConversionUC: IqueryConversionUC,
    private queryHistoryConversionUC: IqueryHistoryCurrencyUC,
  ) {}

  @Get('convert')
  async convertCurrency(
    @Query() query: QueryConversionOneDto,
    @DuserContext() user: IuserContext,
  ) {
    const result = await this.queryConversionUC.getOne(query, user);
    return new ResponseHttp(result.status, result);
  }

  @Get('history')
  async getHistory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('from') from: Ecurrency,
    @Query('to') to: Ecurrency,
    @Query('userId') userId: string,
    @DuserContext() user: IuserContext,
  ) {
    const result = await this.queryHistoryConversionUC.getAll(page, limit, {
      from,
      to,
      userId: userId ? userId : user.userId,
    });
    return new ResponseHttp(result.status, result);
  }

  @Get('history/metric')
  async getHistoryMetric(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('from') from: Ecurrency,
    @Query('to') to: Ecurrency,
    @Query('userId') userId: string,
  ) {
    const result = await this.queryHistoryConversionUC.getAllMetrics({
      from,
      to,
      userId,
    });
    return new ResponseHttp(result.status, result);
  }
}

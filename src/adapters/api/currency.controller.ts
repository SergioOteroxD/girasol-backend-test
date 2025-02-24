import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ResponseHttp } from '../../commons/response/common/entity/response-http.model';
import { AuthJwtGuard } from '../guard/jwt.guard';
import { DuserContext } from '../decorator/user-context.decorator';
import { IuserContext } from '../../core/entity/user-context.entity';
import { IqueryConversionUC } from 'src/core/use_case/query-conversion.uc';
import { QueryConversionOneDto } from '../dto/query-conversion-one.dto';

@Controller('currency')
@UseGuards(AuthJwtGuard)
export class CurrencyController {
  constructor(private queryConversionUC: IqueryConversionUC) {}

  @Get('convert')
  async convertCurrency(
    @Query() query: QueryConversionOneDto,
    @DuserContext() user: IuserContext,
  ) {
    const result = await this.queryConversionUC.getOne(query, user);
    return new ResponseHttp(result.status, result);
  }
}

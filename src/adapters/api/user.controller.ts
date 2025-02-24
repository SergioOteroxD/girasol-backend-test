import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ResponseHttp } from '../../commons/response/common/entity/response-http.model';
import { RegisterUserDto } from '../dto/register-user.dto';
import { IregisterUserUC } from '../../core/use_case/register-user.uc';
import { IqueryUserUC } from '../../core/use_case/query-user.uc';
import { EuserType } from '../../commons/enum/user-type.enum';

@Controller('user')
export class UserController {
  constructor(
    private registerUserUC: IregisterUserUC,
    private queryUsarUC: IqueryUserUC,
  ) {}

  @Post('register')
  async registerUser(@Body() body: RegisterUserDto) {
    const result = await this.registerUserUC.create(body);
    return new ResponseHttp(result.status, result);
  }

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
    @Query('email') email: string,
    @Query('name') name: string,
    @Query('userType') userType: EuserType,
  ) {
    const result = await this.queryUsarUC.getAll(
      page,
      limit,
      { email, name, userType },
      undefined,
    );
    return new ResponseHttp(result.status, result);
  }
}

import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Ecurrency } from '../../commons/enum/currency.enum';
import { ApiProperty } from '@nestjs/swagger';
export class QueryConversionOneDto {
  @ApiProperty({})
  @IsNotEmpty({ message: 'El parámetro "from" es obligatorio' })
  @IsEnum(Ecurrency, { message: 'Debe coincidir con Ecurrency' })
  from: Ecurrency;

  @ApiProperty({})
  @IsNotEmpty({ message: 'El parámetro "to" es obligatorio' })
  @IsEnum(Ecurrency, { message: 'Debe coincidir con Ecurrency' })
  to: Ecurrency;

  @ApiProperty({})
  @IsNumberString({}, { message: 'El parámetro "amount" debe ser un número' })
  @IsNotEmpty({ message: 'El parámetro "from" es obligatorio' })
  amount: number;
}

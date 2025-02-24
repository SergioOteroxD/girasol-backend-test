import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { Ecurrency } from '../../commons/enum/currency.enum';
export class QueryConversionOneDto {
  @IsNotEmpty({ message: 'El parámetro "from" es obligatorio' })
  @IsEnum(Ecurrency, { message: 'Debe coincidir con Ecurrency' })
  from: Ecurrency;

  @IsNotEmpty({ message: 'El parámetro "to" es obligatorio' })
  @IsEnum(Ecurrency, { message: 'Debe coincidir con Ecurrency' })
  to: Ecurrency;

  @IsNumberString({}, { message: 'El parámetro "amount" debe ser un número' })
  @IsNotEmpty({ message: 'El parámetro "from" es obligatorio' })
  amount: number;
}

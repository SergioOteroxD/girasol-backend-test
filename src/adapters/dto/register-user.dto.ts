import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { EuserType } from '../../commons/enum/user-type.enum';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterUserDto {
  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsEmail()
  email: string;

  @ApiProperty({ enum: EuserType, enumName: 'EuserType' })
  @IsEnum(EuserType)
  userType: EuserType;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}

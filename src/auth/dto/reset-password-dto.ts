import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'почта пользователя',
    example: 'admin@mail.ru',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Pass_1',
    required: true,
    type: 'string',
    description: 'Пароль пользователя',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 5,
    minSymbols: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;
}

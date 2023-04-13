import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginUserBodyDto {
  @ApiProperty({
    example: 'test@test.com',
    required: true,
    type: 'string',
    description: 'Почта пользователя',
  })
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

  @ApiProperty({
    example: true,
    required: false,
    type: 'boolean',
    description: 'параметр "Запомнить меня"',
  })
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  rememberMe: boolean;
}

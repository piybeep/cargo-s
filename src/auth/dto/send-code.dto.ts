import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @ApiProperty({
    type: 'string',
    description: 'почта пользователя',
    example: 'test@mail.ru',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

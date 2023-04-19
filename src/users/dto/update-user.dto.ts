import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Pass_2',
    description: 'Новый пароль пользователя',
  })
  password?: string;

  @ApiProperty({
    example: '2138',
    description: 'Код восстановления пароля',
  })
  code?: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'Почта пользователя',
  })
  email?: string;
}

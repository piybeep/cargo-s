import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '26d30416-170e-4710-adaa-013216a2f48d',
    description: 'Id пользователя',
  })
  id: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'Почта пользователя',
  })
  email: string;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время обновления данных пользователя',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время создания пользователя',
  })
  createdAt: Date;
}

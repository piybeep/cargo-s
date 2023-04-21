import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto';

export class CreateProjectResponseDto {
  @ApiProperty({
    example: '26d30416-170e-4710-adaa-013216a2f48d',
    description: 'Id проекта',
  })
  id: string;

  @ApiProperty({
    example: 'Dubai Express',
    description: 'Имя проекта',
  })
  name: string;
  @ApiProperty({
    example: '26d30416-170e-4710-adaa-013216a2f48d',
    description: 'Id пользователя',
  })
  userId: string;

  @ApiProperty({
    example: {
      id: '26d30416-170e-4710-adaa-013216a2f48d',
      email: 'pav.korotkov.03@gmail.com',
      createdAt: '2023-04-13T18:26:56.364Z',
      updatedAt: '2023-04-18T11:07:49.002Z',
    },
    description: 'Объект пользователя',
  })
  user: UserResponseDto;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время обновления данных проекта',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время создания проекта',
  })
  createdAt: Date;
}

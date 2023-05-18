import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../entities/projects.entity';

export class GetAllProjectsResponseDto {
  @ApiProperty({
    example: [
      {
        id: 'ada8c2c9-533d-4ed1-ba84-53282ad8cfef',
        name: 'project2',
        userId: '26d30416-170e-4710-adaa-013216a2f48d',
        updatedAt: '2023-04-18T10:13:12.454Z',
        createdAt: '2023-04-18T10:13:12.454Z',
      },
      {
        id: '03072ea8-b124-42a9-bd70-52ac07718d73',
        name: 'project1',
        userId: '26d30416-170e-4710-adaa-013216a2f48d',
        updatedAt: '2023-04-18T10:50:15.355Z',
        createdAt: '2023-04-18T09:56:54.613Z',
      },
    ],
    description: 'Массив объектов проектов',
  })
  data: Project[];

  @ApiProperty({
    example: 2,
    description: 'Количество всех найденых объектов',
  })
  count: number;

  @ApiProperty({
    exmaple: 2,
    description: 'страница выдачи'
  })
  page: number;
}

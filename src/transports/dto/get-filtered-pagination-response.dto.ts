import { ApiProperty } from '@nestjs/swagger';
import { GetAllFilteredResponseDto } from './get-all-filtered-response.dto';

export class GetAllFilteredPaginationResponseDto {
  @ApiProperty({
    type: [GetAllFilteredResponseDto],
    description: 'Массив объектов грузовых пространств',
  })
  data: GetAllFilteredResponseDto[];

  @ApiProperty({
    example: 2,
    description: 'Страница',
  })
  page: number;

  @ApiProperty({
    example: 2,
    description: 'Общее количество страниц',
  })
  pageCount: number;

  @ApiProperty({
    example: 2,
    description: 'Общее количество элементов',
  })
  itemCount: number;
}

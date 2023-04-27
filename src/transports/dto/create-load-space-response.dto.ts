import { ApiProperty } from '@nestjs/swagger';
import { LoadSpaceTypes, SizeUnits, WeightUnits } from '../enums';
import { CreateTransportResponseDto } from './index';

export class CreateLoadSpaceResponseDto {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  id: string;

  @ApiProperty({
    example: 'Тачка',
    description: 'Наименование грузового пространства',
  })
  name: string;

  @ApiProperty({ enum: LoadSpaceTypes })
  type: LoadSpaceTypes;

  @ApiProperty({ example: true, description: 'Шаблон или нет' })
  isTemplate: boolean;

  @ApiProperty({ enum: SizeUnits })
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  weightUnit: WeightUnits;

  @ApiProperty({ example: 300, description: 'Длина' })
  length: number;

  @ApiProperty({ example: 300, description: 'Ширина' })
  width: number;

  @ApiProperty({ example: 300, description: 'Высота' })
  height: number;

  @ApiProperty({ example: 300, description: 'Тоннаж' })
  weight: number;

  @ApiProperty({
    type: [CreateTransportResponseDto],
    description:
      'Массив объектов транспорта (если 2 объекта и поля length и length1 одного из них равны null,то это полуприцеп, иначе тягач) ',
  })
  transports: CreateTransportResponseDto[];
}

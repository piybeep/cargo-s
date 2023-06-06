import { ApiProperty } from '@nestjs/swagger';
import { LoadSpaceTypes, SizeUnits, WeightUnits } from '../enums';
import { Transport } from '../entities';
import { Cargo } from 'src/cargos/entities';

export class GetAllFilteredResponseDto {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  id: string;

  @ApiProperty({
    example: 'Грузовое пространство 92m3',
    description: 'Имя грузового пространства',
  })
  name: string;

  @ApiProperty({ enum: LoadSpaceTypes })
  type: LoadSpaceTypes;

  @ApiProperty({
    example: true,
    description: 'Шаблон или нет',
  })
  isTemplate: boolean;

  @ApiProperty({ enum: WeightUnits })
  weightUnit: WeightUnits;

  @ApiProperty({ enum: SizeUnits })
  sizeUnit: SizeUnits;

  @ApiProperty({ examples: [200, 200.1], description: 'Длина' })
  length: number;

  @ApiProperty({ examples: [200, 200.1], description: 'Ширина' })
  width: number;

  @ApiProperty({ examples: [200, 200.1], description: 'Высота' })
  height: number;

  @ApiProperty({ examples: [200, 200.1], description: 'Тоннаж' })
  weight: number;
}

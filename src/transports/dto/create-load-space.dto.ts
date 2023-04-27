import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { LoadSpaceTypes, SizeUnits, WeightUnits } from '../enums';
import { CreateTransportDto } from './index';

export class CreateLoadSpaceDto {
  @ApiProperty({
    example: 'Тачка',
    description: 'Наименование грузового пространства',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: LoadSpaceTypes })
  @IsEnum(LoadSpaceTypes)
  type: LoadSpaceTypes;

  @ApiProperty({ enum: SizeUnits })
  @IsEnum(SizeUnits)
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  @IsEnum(WeightUnits)
  weightUnit: WeightUnits;

  @ApiProperty({ example: 300, description: 'Длина' })
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({ example: 300, description: 'Ширина' })
  @IsNumber()
  @IsPositive()
  width: number;

  @ApiProperty({ example: 300, description: 'Высота' })
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({ example: 300, description: 'Тоннаж' })
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({
    type: [CreateTransportDto],
    description:
      'Массив объектов транспорта (если тип ТЯГАЧ С ПОЛУПРИЦЕПОМ в массиве должно быть 2 элемента, иначе один) ',
    required: false,
  })
  @IsOptional()
  transports: CreateTransportDto[];
}

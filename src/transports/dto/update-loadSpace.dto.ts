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

export class UpdateLoadSpaceDto {
  @ApiProperty({
    example: 'Тачка',
    description: 'Наименование грузового пространства',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    enum: LoadSpaceTypes,
  })
  @IsOptional()
  @IsEnum(LoadSpaceTypes)
  type: LoadSpaceTypes;

  @ApiProperty({
    required: false,
    enum: SizeUnits,
  })
  @IsOptional()
  @IsEnum(SizeUnits)
  sizeUnit: SizeUnits;

  @ApiProperty({
    required: false,
    enum: WeightUnits,
  })
  @IsOptional()
  @IsEnum(WeightUnits)
  weightUnit: WeightUnits;

  @ApiProperty({
    example: 300,
    required: false,
    description: 'Длина',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({
    example: 300,
    required: false,
    description: 'Ширина',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  width: number;

  @ApiProperty({
    example: 300,
    required: false,
    description: 'Высота',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({
    example: 300,
    required: false,
    description: 'Тоннаж',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { SizeUnits, WeightUnits } from 'src/transports/enums';
import { CargoTypes, TiersEnum } from '../enums';

export class CreateCargoDto {
  @ApiProperty({
    example: 'Коробка',
    description: 'Наименование груза',
    default: 'Новое место',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    required: false,
    description: 'Id транспорта',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  loadSpaceId: string;

  @ApiProperty({
    example: 'FBCEB1',
    description: 'Код цвета',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @ApiProperty({ enum: SizeUnits })
  @IsEnum(SizeUnits)
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  @IsEnum(WeightUnits)
  weightUnit: WeightUnits;

  @ApiProperty({
    example: 23,
    description: 'Количество грузов',
  })
  @IsInt()
  @IsPositive()
  count: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина груза',
  })
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Ширина груза',
  })
  @IsNumber()
  @IsPositive()
  width: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Высота груза',
  })
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({
    example: 3040,
    description: 'Масса груза',
  })
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({ enum: TiersEnum })
  @IsEnum(TiersEnum)
  tiers: TiersEnum;

  @ApiProperty({ enum: CargoTypes })
  @IsEnum(CargoTypes)
  type: CargoTypes;

  @ApiProperty({ example: 30, description: 'Нагрузка груза' })
  @IsNumber()
  @IsPositive()
  load: number;

  @ApiProperty({
    example: true,
    description: 'Можно ли поворачивать по горизонтали',
  })
  @IsBoolean()
  turn: boolean;

  @ApiProperty({
    example: false,
    description: 'Можно ли поворачивать по вертикали',
  })
  @IsBoolean()
  tilting: boolean;

  @ApiProperty({ example: true, description: 'Является шаблоном?' })
  @IsBoolean()
  isTemplate: boolean;
}

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

export class UpdateCargoDto {
  @ApiProperty({
    example: 'Коробка',
    description: 'Наименование груза',
    default: 'Новое место',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id группы',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  groupId: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id транспорта',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  transportId: string;

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
  @IsOptional()
  @IsEnum(SizeUnits)
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  @IsOptional()
  @IsEnum(WeightUnits)
  weightUnit: WeightUnits;

  @ApiProperty({
    example: 23,
    description: 'Количество грузов',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  count: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина груза',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Ширина груза',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  width: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Высота груза',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height: number;

  @ApiProperty({
    example: 3040,
    description: 'Масса груза',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({ enum: TiersEnum })
  @IsOptional()
  @IsEnum(TiersEnum)
  tiers: TiersEnum;

  @ApiProperty({ enum: CargoTypes })
  @IsOptional()
  @IsEnum(CargoTypes)
  type: CargoTypes;

  @ApiProperty({ example: 30, description: 'Нагрузка груза' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  load: number;

  @ApiProperty({
    example: true,
    description: 'Можно ли поворачивать по горизонтали',
  })
  @IsOptional()
  @IsBoolean()
  turn: boolean;

  @ApiProperty({
    example: false,
    description: 'Можно ли поворачивать по вертикали',
  })
  @IsOptional()
  @IsBoolean()
  tilting: boolean;

  @ApiProperty({ example: true, description: 'Является шаблоном?' })
  @IsOptional()
  @IsBoolean()
  isTemplate: boolean;
}

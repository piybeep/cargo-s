import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { SizeUnits, TransportTypes, WeightUnits } from '../enums';

export class UpdateTruckDto {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id транспорта',
  })
  id: string;

  @ApiProperty({
    enum: TransportTypes,
  })
  @IsEnum(TransportTypes)
  type: TransportTypes;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  @IsUUID(4)
  loadSpaceId: string;

  @ApiProperty({ example: 2, description: 'Количество осей' })
  @IsInt()
  @Min(1)
  @Max(4)
  axesCount: number;

  @ApiProperty({ enum: SizeUnits })
  @IsEnum(SizeUnits)
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  @IsEnum(WeightUnits)
  weightUnit: WeightUnits;

  @ApiProperty({ example: 300, description: 'Собственная масса без груза' })
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({ example: 300, description: 'Длина между осями' })
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от оси А1 до сцеп.устройства',
  })
  @IsNumber()
  @IsPositive()
  length1: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от центра тележки до сцеп устройства',
  })
  @IsNumber()
  @IsPositive()
  length2: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от центра тележки А2 до стенки',
  })
  @IsNumber()
  @IsPositive()
  length3: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А1 без груза' })
  @IsNumber()
  @IsPositive()
  axle1Min: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А1 с грузом' })
  @IsNumber()
  @IsPositive()
  axle1Max: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А2 без груза' })
  @IsNumber()
  @IsPositive()
  axle2Min: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А2  с грузом' })
  @IsNumber()
  @IsPositive()
  axle2Max: number;
}

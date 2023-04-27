import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { SizeUnits, TransportTypes, WeightUnits } from '../enums';

export class UpdateTransportDto {
  @ApiProperty({
    enum: TransportTypes,
  })
  @IsOptional()
  @IsEnum(TransportTypes)
  type: TransportTypes;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  @IsOptional()
  @IsUUID(4)
  loadSpaceId: string;

  @ApiProperty({ example: 2, description: 'Количество осей' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  axesCount: number;

  @ApiProperty({ enum: SizeUnits })
  @IsOptional()
  @IsEnum(SizeUnits)
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  @IsOptional()
  @IsEnum(WeightUnits)
  weightUnit: WeightUnits;

  @ApiProperty({ example: 300, description: 'Собственная масса без груза' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight: number;

  @ApiProperty({ example: 300, description: 'Длина между осями' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от оси А1 до сцеп.устройства',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length1: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от центра тележки до сцеп устройства',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length2: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от центра тележки А2 до стенки',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  length3: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А1 без груза' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  axle1Min: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А1 с грузом' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  axle1Max: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А2 без груза' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  axle2Min: number;

  @ApiProperty({ example: 300, description: 'Нагрузка на ось А2  с грузом' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  axle2Max: number;
}

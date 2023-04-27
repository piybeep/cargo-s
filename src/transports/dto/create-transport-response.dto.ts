import { ApiProperty } from '@nestjs/swagger';
import { SizeUnits, TransportTypes, WeightUnits } from '../enums';

export class CreateTransportResponseDto {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id транспорта',
  })
  id: string;

  @ApiProperty({
    enum: TransportTypes,
  })
  type: TransportTypes;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  loadSpaceId: string;

  @ApiProperty({
    example: 2,
    description: 'Количество осей',
  })
  axesCount: number;

  @ApiProperty({ enum: SizeUnits })
  sizeUnit: SizeUnits;

  @ApiProperty({ enum: WeightUnits })
  weightUnit: WeightUnits;

  @ApiProperty({
    example: 300,
    description: 'Собственная масса без груза',
  })
  weight: number;

  @ApiProperty({
    example: 300,
    description: 'Длина между осями',
  })
  length: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от оси А1 до сцеп.устройства',
  })
  length1: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от центра тележки до сцеп устройства',
  })
  length2: number;

  @ApiProperty({
    example: 300,
    description: 'Длина от центра тележки А2 до стенки',
  })
  length3: number;

  @ApiProperty({
    example: 300,
    description: 'Нагрузка на ось А1 без груза',
  })
  axle1Min: number;

  @ApiProperty({
    example: 300,
    description: 'Нагрузка на ось А1 с грузом',
  })
  axle1Max: number;

  @ApiProperty({
    example: 300,
    description: 'Нагрузка на ось А2 без груза',
  })
  axle2Min: number;

  @ApiProperty({
    example: 300,
    description: 'Нагрузка на ось А2  с грузом',
  })
  axle2Max: number;
}

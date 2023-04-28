import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SizeUnits, TransportTypes, WeightUnits } from '../enums';
import { LoadSpace } from './loadSpace.entity';

@Entity('Transports')
export class Transport {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id транспорта',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    enum: TransportTypes,
    description: 'Тип транспорта',
  })
  @Column({ enum: TransportTypes })
  type: TransportTypes;

  @ApiProperty({
    example: true,
    description: 'Id грузового пространства',
  })
  @Column({ type: 'uuid', nullable: true })
  loadSpaceId: string;

  @ApiProperty({
    example: 3,
    description: 'Количество осей',
  })
  @Column({ type: 'integer' })
  axesCount: number;

  @ApiProperty({
    example: 3040,
    description: 'Собственная масса без груза',
  })
  @Column({ type: 'decimal' })
  weight: number;

  @ApiProperty({
    enum: WeightUnits,
    description: 'Едиица измерения массы',
  })
  @Column({ enum: WeightUnits })
  weightUnit: WeightUnits;

  @ApiProperty({
    enum: SizeUnits,
    description: 'Едиица измерения длины',
  })
  @Column({ enum: SizeUnits })
  sizeUnit: SizeUnits;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина между осями',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  length: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина от оси А1 до сцеп.устройства',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  length1: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина от центра тележки A2 до сцеп.устройства',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  length2: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина от центра тележки A2 до стенки',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  length3: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Нагрузка на ось A1 без груза',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  axle1Min: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Максимальная нагрузка на ось A1',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  axle1Max: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Нагрузка на осевую тележку A2 без груза',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  axle2Min: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Максимальная нагрузка на осевую тележку A2',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  axle2Max: number;

  /*  ASSOCIATONS  */

  @ManyToOne(() => LoadSpace, (loadSpace: LoadSpace) => loadSpace.transports)
  loadSpace: LoadSpace;
}

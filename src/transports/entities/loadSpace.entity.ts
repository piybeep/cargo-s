import { ApiProperty } from '@nestjs/swagger';
import { Cargo } from 'src/cargos/entities';
import { ColumnNumericTransformer } from 'src/utils';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoadSpaceTypes, SizeUnits, WeightUnits } from '../enums';
import { Transport } from './transport.entity';

@Entity('LoadSpaces')
export class LoadSpace {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Грузовое пространство 92m3',
    description: 'Имя грузового пространства',
  })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ enum: LoadSpaceTypes })
  @Column({ enum: LoadSpaceTypes })
  type: LoadSpaceTypes;

  @ApiProperty({
    example: true,
    description: 'Шаблон или нет',
  })
  @Column({ type: 'boolean', default: false })
  isTemplate: boolean;

  @ApiProperty({ enum: WeightUnits })
  @Column({ enum: WeightUnits })
  weightUnit: WeightUnits;

  @ApiProperty({ enum: SizeUnits })
  @Column({ enum: SizeUnits })
  sizeUnit: SizeUnits;

  @ApiProperty({ examples: [200, 200.1], description: 'Длина' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  length: number;

  @ApiProperty({ examples: [200, 200.1], description: 'Ширина' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  width: number;

  @ApiProperty({ examples: [200, 200.1], description: 'Высота' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  height: number;

  @ApiProperty({ examples: [200, 200.1], description: 'Тоннаж' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  weight: number;

  /*  ASSOCIATONS  */

  @OneToMany(() => Transport, (transport: Transport) => transport.loadSpace, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  transports: Transport[];

  @OneToMany(() => Cargo, (cargo: Cargo) => cargo.loadSpace)
  cargos: Cargo[];
}

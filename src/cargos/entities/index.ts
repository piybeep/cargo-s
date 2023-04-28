import { ApiProperty } from '@nestjs/swagger';
import { SizeUnits, WeightUnits } from 'src/transports/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CargoTypes, TiersEnum } from '../enums';
import { Transport } from 'src/transports/entities';
import { Group } from 'src/groups/entities';
import { LoadSpace } from '../../transports/entities/loadSpace.entity';

@Entity('Cargos')
export class Cargo {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id груза',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Коробка',
    description: 'Наименование груза',
  })
  @Column({ type: 'text', default: 'Новое место' })
  name: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id группы',
  })
  @Column({ type: 'uuid', nullable: true })
  groupId: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id грузового пространства',
  })
  @Column({ type: 'uuid', nullable: true })
  loadSpaceId: string;

  @ApiProperty({
    example: 'FBCEB1',
    description: 'Код цвета',
  })
  @Column({ type: 'text', nullable: true })
  color: string;

  @ApiProperty({
    enum: SizeUnits,
  })
  @Column({ enum: SizeUnits })
  sizeUnit: SizeUnits;

  @ApiProperty({
    enum: WeightUnits,
  })
  @Column({ enum: WeightUnits })
  weightUnit: WeightUnits;

  @ApiProperty({ example: 23, description: 'Количество грузов' })
  @Column({ type: 'int', default: 1 })
  count: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Длина груза',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  length: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Ширина груза',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  width: number;

  @ApiProperty({
    examples: [200, 200.1],
    description: 'Высота груза',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  height: number;

  @ApiProperty({
    example: 3040,
    description: 'Масса груза',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  weight: number;

  @ApiProperty({ enum: TiersEnum })
  @Column({ enum: TiersEnum })
  tiers: TiersEnum;

  @ApiProperty({ enum: CargoTypes })
  @Column({ enum: CargoTypes })
  type: CargoTypes;

  @ApiProperty({ example: 30, description: 'Нагрузка груза' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  load: number;

  @ApiProperty({
    example: true,
    description: 'Можно ли поворачивать по горизонтали',
  })
  @Column({ type: 'boolean', default: true })
  turn: boolean;

  @ApiProperty({
    example: false,
    description: 'Можно ли поворачивать по вертикали',
  })
  @Column({ type: 'boolean', default: false })
  tilting: boolean;

  @ApiProperty({ example: true, description: 'Является шаблоном?' })
  @Column({ type: 'boolean', default: false })
  isTemplate: boolean;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  /*  ASSOCIATONS  */

  @ManyToOne(() => LoadSpace, (loadSpace: LoadSpace) => loadSpace.cargos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'loadSpaceId' })
  loadSpace: LoadSpace;

  @ManyToOne(() => Group, (group: Group) => group.cargos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'groupId' })
  group: Group;
}

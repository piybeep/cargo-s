import { ApiProperty } from '@nestjs/swagger';
import { Cargo } from 'src/cargos/entities';
import { Project } from 'src/projects/entities/projects.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Groups')
export class Group {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id группы',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'UAE group',
    description: 'Наименование группы',
  })
  @Column({
    type: 'text',
    unique: false
  })
  name: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id проекта',
  })
  @Column()
  projectId: string;

  @ApiProperty({ example: 2, description: 'порядковый номер в списке' })
  @Column({ type: 'int' })
  position: number;

  @ApiProperty({ example: true, description: 'скрыть группу' })
  @Column({ type: 'bool', default: false })
  hide: boolean;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время обновления данных группы',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время создания группы',
  })
  @CreateDateColumn()
  createdAt: Date;

  /*  ASSOCIATONS  */

  @ManyToOne(() => Project, (project: Project) => project.groups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @OneToMany(() => Cargo, (cargos: Cargo) => cargos.group)
  cargos: Cargo[];
}

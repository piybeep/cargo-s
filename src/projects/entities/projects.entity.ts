import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/entities';
import { User } from 'src/users/entities/user.entity';
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

@Entity('projects')
export class Project {
  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id проекта',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Dubai Express',
    description: 'Наименование проекта',
  })
  @Column({
    type: 'text',
  })
  name: string;

  @ApiProperty({
    example: '0d1d44f2-a78c-410d-8e1a-9ce44e9f9876',
    description: 'Id пользователя',
  })
  @Column()
  userId: string;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время обновления данных проекта',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2023-04-19T05:56:59.641Z',
    description: 'Дата и время создания проекта',
  })
  @CreateDateColumn()
  createdAt: Date;

  /*  ASSOCIATONS  */

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Group, (group) => group.project, { onDelete: 'CASCADE' })
  groups: Group[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Auth } from 'src/auth/entities';
import { Project } from 'src/projects/entities/projects.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('Users')
export class User {
  @ApiProperty({
    name: 'id',
    description: 'id пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    name: 'email',
    description: 'почта пользователя',
    example: 'obababok.2003@gmail.com',
  })
  @Column({ unique: true, type: 'text' })
  email: string;

  @ApiProperty({
    name: 'password',
    description: `пароль пользователя (${{
      minLength: 5,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 1,
    }})`,
    example: 'GY32(H-dja2',
  })
  @Column({ type: 'text' })
  password: string;

  @ApiProperty({
    name: 'code',
    description: 'код для восстановления пароля',
    example: '2736',
  })
  @Column({ nullable: true, type: 'text' })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /*  ASSOCIATIONS  */

  @OneToMany(() => Auth, (auth) => auth.user)
  auths: Auth[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}

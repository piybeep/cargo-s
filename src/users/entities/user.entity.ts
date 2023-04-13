import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/entity/auth.entity';
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
    //TODO: описать формат пароля
    name: 'password',
    description: 'пароль пользователя ()',
    example: 'GY32Hdja2',
  })
  @Column({ type: 'text' })
  password: string;

  @ApiProperty({
    name: 'code',
    description: 'код для восстановления пароля',
    example: '23nd7d2',
  })
  @Column({ nullable: true, type: 'text' })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Auth, (auth) => auth.user)
  auths: Auth[];
}

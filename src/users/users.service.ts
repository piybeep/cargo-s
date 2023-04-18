import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserBodyDto } from './dto/create-user-body.dto';
import { hashSync } from 'bcrypt';
import { UpdateUserDto } from './dto';
import { LoginUserResponseDto } from 'src/auth/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(
    userData: CreateUserBodyDto,
  ): Promise<LoginUserResponseDto | undefined> {
    userData.password = hashSync(userData.password, 10);
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user;
  }

  async findOne(findParams: { email?: string; id?: string }): Promise<User> {
    return await this.userRepository.findOneBy(findParams);
  }

  async update(findOptions: FindOptionsWhere<User>, data: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(findOptions, data);
    if (updatedUser.affected !== 0) {
      return await this.userRepository.findOneBy({
        email: data.email || findOptions.email,
      });
    } else {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}

import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CreateUserBodyDto } from './dto';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}


  //СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({
    type: CreateUserBodyDto,
    description: 'Почта и пароль пользователя',
  })
  @ApiResponse({ status: 200, type: User, description: 'объект пользователя' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('signup')
  async signUp(@Body() userPaylaod: CreateUserBodyDto): Promise<User> {
    return await this.userService.signUp(userPaylaod);
  }

  
  //ОБНОВЛЕНИЕ ПАРОЛЯ ПО КОДУ

}

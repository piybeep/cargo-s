import {  Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserBodyDto } from './dto';
import { LoginUserResponseDto } from 'src/auth/dto';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({
    type: CreateUserBodyDto,
    description: 'Почта и пароль пользователя',
  })
  @ApiResponse({ status: 200, type: LoginUserResponseDto})
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('signup')
  async signUp(@Body() userPaylaod: CreateUserBodyDto): Promise<LoginUserResponseDto> {
    return await this.userService.signUp(userPaylaod);
  }

}

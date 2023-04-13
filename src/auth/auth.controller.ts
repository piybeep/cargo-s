import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  LoginUserBodyDto,
  ResetPasswordDto,
  SendCodeDto,
  LoginUserResponseDto,
} from './dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/token.guard';
import { UserService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { getCookieConfig } from 'src/configs/cookie.config';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({
    type: LoginUserBodyDto,
    description: 'данные для авторизации пользователя',
  })
  @ApiResponse({ status: 201, type: LoginUserResponseDto })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @Post('signin')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userData: LoginUserBodyDto,
  ) {
    const { token, user } = await this.authService.login(userData);
    res.cookie(
      'token',
      token,
      getCookieConfig(userData.rememberMe, this.configService),
    );
    return user;
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiCookieAuth('token')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @UseGuards(JwtGuard)
  @Delete('signout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.user);
    res.clearCookie('token');
  }

  @ApiOperation({ summary: 'Обновление времени действия сессия пользователя' })
  @ApiCookieAuth('token')
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @UseGuards(JwtGuard)
  @Get('me')
  async getCurrentUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, session } = await this.authService.getCurrentUser(req.user);
    res.cookie(
      'token',
      token,
      getCookieConfig(session?.rememberMe ?? false, this.configService),
    );
  }

  @ApiOperation({
    summary: 'Отправка сообщения на почту с кодом подтверждения',
  })
  @ApiBody({ type: SendCodeDto, description: 'Почта пользователя' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @Get('code')
  async sendCode(@Body() payload: SendCodeDto) {
    await this.authService.sendCode(payload.email);
  }

  @ApiOperation({
    summary: 'Изменение пароля по коду верификации',
  })
  @ApiParam({
    name: 'code',
    description: 'код подтверждения',
    required: true,
    example: '1233',
  })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Почта и новый пароль пользователя',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'BAD_REQUEST' })
  @ApiResponse({ status: 500, description: 'INTERNAL_SERVER_ERROR' })
  @Put('reset/:code')
  async resetPassword(
    @Param('code') code: string,
    @Body() payload: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(payload, code);
  }
}

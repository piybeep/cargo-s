import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { LoginUserBodyDto, ResetPasswordDto } from './dto';
import { Auth } from './entity/auth.entity';
import { UserService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { randomInt } from 'crypto';
import { LoginUserResponseWithTokenDto } from './dto/login-user-response-with-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(
    userData: LoginUserBodyDto,
  ): Promise<LoginUserResponseWithTokenDto> {
    const user: User | undefined = await this.userService.findOne({
      email: userData.email,
    });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    if (!compareSync(userData.password, user.password)) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = await this.getToken(
      user.id,
      user.email,
      userData.rememberMe || false,
    );

    await this.saveToken(token, user.id, userData.rememberMe);
    delete user.password;
    delete user.code;
    return { token, user };
  }

  async logout(user: any) {
    return await this.authRepository.update(
      { userId: user.sub },
      { token: null },
    );
  }

  async saveToken(
    token: string,
    userId: string,
    rememberMe?: boolean,
  ): Promise<void> {
    const hashed_token: string = this.hashData(token);
    const session = await this.authRepository.findOneBy({ userId });
    if (!session) {
      await this.authRepository.save({
        token: hashed_token,
        userId,
        rememberMe: rememberMe ?? session?.rememberMe,
      });
    } else {
      await this.authRepository.update(
        { userId },
        { token: hashed_token, rememberMe: rememberMe ?? session.rememberMe },
      );
    }
  }

  hashData(data: string) {
    const salt = genSaltSync(10);
    return hashSync(data, salt);
  }

  async getToken(userId: string, email: string, rememberMe = false) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: rememberMe ? '30d' : '1d',
      },
    );
  }

  async getCurrentUser(user: any) {
    const token = await this.getToken(user.sub, user.email);
    const session = await this.authRepository.findOneBy({ userId: user.sub });
    if (!user || !session) {
      throw new UnauthorizedException();
    }
    await this.saveToken(token, user.sub);
    await this.clearSessions();
    return {
      token,
      session: session ?? null,
    };
  }

  async clearSessions() {
    await this.authRepository.delete({
      createdAt: LessThan(
        new Date(Date.now() - this.configService.get<number>('EXPIRES_IN_30D')),
      ),
      rememberMe: true,
    });
    await this.authRepository.delete({
      createdAt: LessThan(
        new Date(Date.now() - this.configService.get<number>('EXPIRES_IN_1D')),
      ),
      rememberMe: false,
    });
  }

  async sendCode(email: string): Promise<void> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException(`User ${email} not found`);
    }
    console.log(user);
    await this.mailService.sendNewApplicationMail(user.code);
  }

  async resetPassword(data: ResetPasswordDto, code: string) {
    const user = await this.userService.findOne({ email: data.email });
    if (!user) {
      throw new BadRequestException(`User ${data.email} not found`);
    }
    if (code !== user.code) {
      throw new BadRequestException(`Invalid code`);
    }
    await this.userService.update(
      { email: data.email },
      { password: this.hashData(data.password), code: String(randomInt(9999)) },
    );
  }
}

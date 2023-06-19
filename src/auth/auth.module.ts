import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities';
import { UserModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtCookieStrategy } from './startegies/jwt-cookie.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/configs/jwt.config';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtCookieStrategy],
})
export class AuthModule {}

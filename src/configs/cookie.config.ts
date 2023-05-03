import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

export const getCookieConfig = (
  rememberMe: boolean,
  configService: ConfigService,
): CookieOptions => {
  return configService.get<string>('NODE_ENV') === 'development'
    ? CookieDEV(configService, rememberMe)
    : CookiePROD(configService, rememberMe);
};

const CookieDEV = (
  configService: ConfigService,
  rememberMe: boolean,
): CookieOptions => {
  return {
    maxAge: rememberMe
      ? configService.get<number>('EXPIRES_IN_3MIN')
      : configService.get<number>('EXPIRES_IN_1MIN'),

    expires: new Date(
      Date.now() +
        (rememberMe
          ? configService.get<number>('EXPIRES_IN_3MIN')
          : configService.get<number>('EXPIRES_IN_1MIN')),
    ),
    httpOnly: false,
    secure: false,
    sameSite: 'none',
  };
};

const CookiePROD = (
  configService: ConfigService,
  rememberMe: boolean,
): CookieOptions => {
  return {
    maxAge: rememberMe
      ? configService.get<number>('EXPIRES_IN_30D')
      : configService.get<number>('EXPIRES_IN_1D'),
    expires: new Date(
      Date.now() +
        (rememberMe
          ? configService.get<number>('EXPIRES_IN_30D')
          : configService.get<number>('EXPIRES_IN_1D')),
    ),
    httpOnly: true,
    secure: false,
    sameSite: 'none',
  };
};

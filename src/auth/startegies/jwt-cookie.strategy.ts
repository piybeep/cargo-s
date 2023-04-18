import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor() {
    const cookieExtractor = function (req: any) {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
      }
      return token;
    };
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const token = req.cookies['token'];
    return {
      ...payload,
      token,
    };
  }
}

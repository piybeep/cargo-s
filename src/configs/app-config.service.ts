import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('config.nodeEnv');
  }

  get cookieSecret(): string {
    return this.configService.get<string>('config.cookieSecret');
  }

  get serverPort(): number {
    return Number(this.configService.get<number>('config.server.port'));
  }

  get serverHost(): string {
    return this.configService.get<string>('config.server.host');
  }

  get postgresHost(): string {
    return this.configService.get<string>('config.postgres.postgresHost');
  }

  get postgresPort(): number {
    return this.configService.get<number>('config.postgres.postgresPort');
  }

  get postgresUser(): string {
    return this.configService.get<string>('config.postgres.postgresUser');
  }

  get postgresPassword(): string {
    return this.configService.get<string>('config.postgres.postgresPassword');
  }

  get postgresDatabase(): string {
    return this.configService.get<string>('config.postgres.postgresDatabase');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('config.jwt.jwtSecret');
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('config.jwt.jwtExpiresIn');
  }

  get jwtExpiresInMilliseconds(): number {
    return this.configService.get<number>(
      'config.jwt.jwtExpiresInMilliseconds',
    );
  }
}

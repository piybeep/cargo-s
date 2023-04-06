import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './configs/postgres.config';
import { AppConfigService } from './configs/app-config.service';
import { AppConfigModule } from './configs/app-config.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60,
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: postgresConfig,
    }),
    UserModule,
  ],
})
export class AppModule {}

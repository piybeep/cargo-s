import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { postgresConfig } from './configs/postgres.config';
import { AppConfigService } from './configs/app-config.service';
import { AppConfigModule } from './configs/app-config.module';
import { UserModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';

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
    ProjectsModule,
  ],
})
export class AppModule {}
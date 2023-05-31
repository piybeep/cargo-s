import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { AuthModule } from './auth/auth.module';
import { CargosModule } from './cargos/cargos.module';
import { getMailConfig } from './configs/mail.config';
import { GroupsModule } from './groups/groups.module';
import { ProjectsModule } from './projects/projects.module';
import { TransportsModule } from './transports/transports.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),

    ThrottlerModule.forRoot({
      limit: 10,
      ttl: 60,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(resolve(), 'dist', 'static'),
      serveRoot: '/api/static',
    }),
    AuthModule,
    UserModule,
    ProjectsModule,
    GroupsModule,
    CargosModule,
    TransportsModule,
  ],
})
export class AppModule {}

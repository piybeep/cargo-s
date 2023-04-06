import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigService } from './app-config.service';

export const postgresConfig = async (
  appConfigService: AppConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: appConfigService.postgresHost,
    port: appConfigService.postgresPort,
    username: appConfigService.postgresUser,
    password: appConfigService.postgresPassword,
    database: appConfigService.postgresDatabase,
    entities: [__dirname + '/dist/**/*.entity{.ts,.js}'],
    synchronize: appConfigService.nodeEnv === 'production' ? false : true,
    autoLoadEntities: appConfigService.nodeEnv === 'production' ? false : true,
    logging: appConfigService.nodeEnv === 'production' ? false : true,
  };
};

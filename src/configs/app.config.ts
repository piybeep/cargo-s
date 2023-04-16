import { registerAs } from '@nestjs/config';

interface IAppConfig {
  nodeEnv: string;
  server: {
    port: number;
    host: string;
  };
  cookieSecret: string;
  postgres: {
    postgresHost: string;
    postgresPort: number;
    postgresUser: string;
    postgresPassword: string;
    postgresDatabase: string;
  };
  jwt: {
    jwtSecret: string;
    jwtExpiresIn: string;
    jwtExpiresInMilliseconds: number;
  };
}

export default registerAs(
  'config',
  (): IAppConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    cookieSecret: process.env.COOKIE_SECRET || 'secret',
    server: {
      port: parseInt(process.env.API_PORT, 10) || 3001,
      host: process.env.API_HOST || 'localhost',
    },
    postgres: {
      postgresHost: process.env.POSTGRES_HOST || 'localhost',
      postgresPort: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      postgresUser: process.env.POSTGRES_USER,
      postgresPassword: process.env.POSTGRES_PASSWORD,
      postgresDatabase: process.env.POSTGRES_DATABASE,
    },
    jwt: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
      jwtExpiresInMilliseconds: parseInt(
        process.env.JWT_EXPIRES_IN_MILLISECONDS,
        10,
      ),
    },
  }),
);

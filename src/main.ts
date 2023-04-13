import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './configs/app-config.service';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as compression from 'compression';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);
  const config = new DocumentBuilder()
    .setTitle('Cargo API')
    .setVersion('1.0')
    .setDescription('[Документация](https://shrt.piybeep.com/l/DERRPE)')
    .addBearerAuth({ type: 'http' })
    .build();

  app.use(cookieParser());
  app.use(compression());
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    morgan(
      `[date[clf]] :method :url :status :res[content-length] :response-time ms ":referrer" :remote-addr - :remote-user ":user-agent"`,
    ),
  );
  app.enableCors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/doc', app, document);

  await app.listen(appConfig.serverPort);
}
bootstrap();

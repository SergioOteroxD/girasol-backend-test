import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import rTracer = require('cls-rtracer');
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  //Configuración librería para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Configuración librería para generación de identificador de solicitud
  app.use(rTracer.expressMiddleware());

  const config = new DocumentBuilder()
    .setTitle('Api conversion currency')
    .setDescription('The test for girasol')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const module = configService.get('MODULE');
  app.setGlobalPrefix(module);

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT, async () =>
    Logger.log(
      'INFO',
      `Application is running on: port: ${await app.getUrl()}`,
      'main',
    ),
  );
}
bootstrap();

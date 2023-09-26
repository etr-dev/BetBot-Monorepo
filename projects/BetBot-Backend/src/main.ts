import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { startBrowser } from './ufc/scraper';
import { logServer } from './utils/log';

config({ path: require('find-config')('.env') });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('BetBot')
    .setDescription('The backend for BetBot')
    .setVersion('1.0')
    .addServer('{{URL}}', 'Server with custom variable')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  await startBrowser();

  logServer(`BetBot database is running on port ${process.env.PORT}`);
}
bootstrap();

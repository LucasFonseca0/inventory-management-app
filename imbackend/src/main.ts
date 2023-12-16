import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from 'cors';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(8000);
}

bootstrap();

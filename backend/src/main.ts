import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe with transform
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw if unknown properties sent
      transform: true,          // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS for frontend clients
  app.enableCors();

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

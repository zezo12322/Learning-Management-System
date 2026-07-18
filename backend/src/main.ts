import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe with transform
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw if unknown properties sent
      transform: true, // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS for known frontend origins only (M8). Configure via the
  // CORS_ORIGINS env var (comma-separated). If unset, default to localhost dev
  // origins rather than reflecting every origin.
  const corsOrigins = (
    process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:5173,http://localhost:8085,http://localhost:8086,http://localhost:8087'
  )
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

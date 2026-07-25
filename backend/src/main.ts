import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Centralized error logging + consistent error responses (KAN-60).
  app.useGlobalFilters(new AllExceptionsFilter());
  // Per-request access log (method, path, status, latency) (KAN-60).
  app.useGlobalInterceptors(new LoggingInterceptor());

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

  // Enable CORS for known frontend origins (M8). Explicit production origins are
  // configured via the CORS_ORIGINS env var (comma-separated). Any localhost /
  // 127.0.0.1 origin (any port) is always allowed so browser-based dev/testing
  // (Next.js web, Flutter web) works without reconfiguring per port. Requests
  // with no Origin header (native mobile apps, curl, server-to-server) pass too.
  const corsOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const localhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        localhostOrigin.test(origin) ||
        corsOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
    },
    credentials: true,
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

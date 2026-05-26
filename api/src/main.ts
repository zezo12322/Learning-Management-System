import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  // Global Prefix + Versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

  // CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      configService.get('FRONTEND_URL') || '',
    ],
    credentials: true,
  })

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Swagger API Docs
  if (configService.get('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('OptimaTech LMS API')
      .setDescription('منصة OptimaTech LMS - توثيق الـ API')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api/docs', app, document)
  }

  const port = configService.get<number>('PORT') || 3001
  await app.listen(port)
  console.log(`🚀 API running on: http://localhost:${port}/api/v1`)
  console.log(`📚 Swagger Docs: http://localhost:${port}/api/docs`)
}

bootstrap()

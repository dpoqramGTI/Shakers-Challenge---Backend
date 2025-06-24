import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' }); // Ajustar orígenes según necesidad

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Rate limiting: en imports de AppModule agregar ThrottlerModule.forRoot({ ttl: 60, limit: 100 })
  // y aquí global guard:
  // app.useGlobalGuards(new ThrottlerGuard());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
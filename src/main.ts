import { NestFactory } from '@nestjs/core';
// import { ThrottlerGuard } from '@nestjs/throttler';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new ThrottlerGuard());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
dotenv.config({ debug: false });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      validationError: { target: false },
    }),
  );
  app.enableCors();
  app.use(helmet());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE, PATCH',
    credentials: true
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const formattedErrors =
          errors.map((error) => ({
            field: `body.${error.property}`,
            errors:
              Object.values(
                error.constraints || {},
              ),
          }));

        return new UnprocessableEntityException({
          success: false,
          message: 'Validation Error',
          details: formattedErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

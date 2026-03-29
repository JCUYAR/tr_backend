import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './Presentation/Filters/UnauthorizedExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('My Clean API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth() // si usarás JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * @author Alejandro Darío Fuentefría Oróns
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  //app.useGlobalPipes(new ValidationPipe());
  //  SWAGGER
  if (process.env.NODE_ENV != "production") {
    const config = new DocumentBuilder()
      .setTitle('Banker')
      .setDescription('The Banker Backend')
      .setVersion('1.0')
      .addTag('Banker')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
  };

  if (config.env !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Protocol Modeler API')
      .setDescription('TRYAL Protocol Modeler OpenAPI Specification')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(config.port);
}

bootstrap();

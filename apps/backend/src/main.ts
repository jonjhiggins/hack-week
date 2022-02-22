/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { writeFileSync } from 'fs';

// should do this as a global service
// e.g. https://docs.nestjs.com/techniques/configuration
const envVars = ['FICTIONEERS_API_BASE_URL', 'FICTIONEERS_API_KEY', 'SHOW_DOCS']

envVars.forEach(e => {
  if (!process.env[e]) {
    throw new Error(`Missing ${e}`)
  }
})

function docs(app: INestApplication) {
  // Docs / Swagger
  const config = new DocumentBuilder()
    .setTitle('Hack week API')
    .setDescription('Team newbie')
    .setVersion('1.0')
    .addTag('hack-week')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('open-api.json', JSON.stringify(document))
  SwaggerModule.setup('api', app, document);
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  if (process.env.SHOW_DOCS && process.env.SHOW_DOCS === 'true') {
    docs(app)
  }

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

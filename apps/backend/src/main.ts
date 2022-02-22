/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import * as session from 'express-session';

// should do this as a global service
// e.g. https://docs.nestjs.com/techniques/configuration
const envVars = ['FICTIONEERS_API_BASE_URL', 'FICTIONEERS_API_KEY', 'SESSION_SECRET']

envVars.forEach(e => {
  if (!process.env[e]) {
    throw new Error(`Missing ${e}`)
  }
})


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: {},
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

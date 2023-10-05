import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ExpressAdapter} from '@nestjs/platform-express';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(
	  AppModule,
	  new ExpressAdapter(express()),
  );
  app.enableCors({
	  origin: '*',
	  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	  preflightContinue: false,
	  optionsSuccessStatus: 204,
	  credentials: true
  })
  await app.listen(3000);
}
bootstrap();

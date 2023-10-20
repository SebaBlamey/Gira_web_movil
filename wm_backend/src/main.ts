import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  //const postgresConnection = getConnection("postgres");
=======
>>>>>>> 594e8b82421673a3f8f6a297a19d8478b4aebb30
  app.use(bodyParser.json())
  /*app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });*/
  app.use(cors())
  await app.listen(3000);
}
bootstrap();

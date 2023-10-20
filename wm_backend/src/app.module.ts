import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module'; 
import { AppController } from './app.controller';
import { UserController } from './users/user.controller';
import { AppService } from './app.service';
import { UserService } from './users/user.service';
import { TableroModule } from './tablero/tablero.module';
import { TableroController } from './tablero/tablero.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/user_db'),
    UserModule,
    TableroModule
  ],
  controllers: [AppController, UserController, TableroController],
  providers: [AppService],
})
export class AppModule {}

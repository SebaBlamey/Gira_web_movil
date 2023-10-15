import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module'; 
import { AppController } from './app.controller';
import { UserController } from './users/user.controller';
import { AppService } from './app.service';
import { UserService } from './users/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/user_db'),
    UserModule,
  
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

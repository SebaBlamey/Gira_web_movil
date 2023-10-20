import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { TableroModule } from './tablero/tablero.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipoModule } from './team/equipo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user_db'),
    UserModule,
    EquipoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

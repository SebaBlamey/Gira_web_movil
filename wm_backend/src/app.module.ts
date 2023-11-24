import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipoModule } from './team/equipo.module';
import { TrabajoModule } from './proyect/trabajo.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user_db'),
    UserModule,
    EquipoModule,
    TrabajoModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

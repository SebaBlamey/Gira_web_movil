import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TableroModule } from './tablero/tablero.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquipoModule } from './team/equipo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/user_db'),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'mydb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EquipoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

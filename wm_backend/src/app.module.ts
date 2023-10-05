import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity'; // Asegúrate de importar tu entidad
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'localdb.sqlite',
      synchronize: true,
      logging: true,
      entities: [UserEntity], // Agrega tu entidad aquí
    }),
    TypeOrmModule.forFeature([UserEntity]), // Agrega esto para habilitar el repositorio
  ],
})
export class AppModule {}

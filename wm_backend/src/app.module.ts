import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configuración de conexión a la base de datos aquí
    }),
    TypeOrmModule.forFeature([UserEntity]), // Esto es importante
  ],
  controllers: [], // Tus controladores
  providers: [], // Tus servicios
})
export class AppModule {}


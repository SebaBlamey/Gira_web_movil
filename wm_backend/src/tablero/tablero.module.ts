import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tablero } from './entities/tablero.entity';
import { TableroController } from './tablero.controller';
import { TableroService } from './tablero.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tablero])],
  controllers: [TableroController],
  providers: [TableroService],
  exports: [TableroService],
})
export class TableroModule {}

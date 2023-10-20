import { Controller, Get, Post, Body } from '@nestjs/common';
import { TableroService } from './tablero.service';
import { CreateTableroDto } from './dto/create-tablero.dto';

@Controller('tablero')
export class TableroController {
  constructor(private readonly tableroService: TableroService) {}

  @Get()
  async findAll() {
    return await this.tableroService.findAll();
  }

  @Post()
  create(@Body() createTableroDto: CreateTableroDto) {
    return this.tableroService.create(createTableroDto);
  }
}

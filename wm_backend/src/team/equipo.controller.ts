import { Controller, Get, Post, Body } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/equipo.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Get()
  async findAll() {
    return await this.equipoService.findAll();
  }

  @Post('/create')
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }
  @Post('/delete')
  delete(@Body() _id: string) {
    return this.equipoService.delete(_id);
  }
}

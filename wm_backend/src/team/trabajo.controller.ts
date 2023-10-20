import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateEquipoDto, UpdateEquipoDto } from './dto/equipo.dto';

@Controller('trabajo')
export class TrabajoController {
  constructor(private readonly trabajoService: TrabajoService) {}

  @Get(':id/equipos')
  getEquipos(@Param('id') id: number) {
    return this.trabajoService.getEquipos(id);
  }

  @Post(':id/equipos')
  createEquipo(@Param('id') id: number, @Body() createEquipoDto: CreateEquipoDto) {
    return this.trabajoService.createEquipo(id, createEquipoDto);
  }

  @Put(':id/equipos/:equipoId')
  updateEquipo(
    @Param('id') id: number,
    @Param('equipoId') equipoId: number,
    @Body() updateEquipoDto: UpdateEquipoDto,
  ) {
    return this.trabajoService.updateEquipo(id, equipoId, updateEquipoDto);
  }

  @Delete(':id/equipos/:equipoId')
  deleteEquipo(@Param('id') id: number, @Param('equipoId') equipoId: number) {
    return this.trabajoService.deleteEquipo(id, equipoId);
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TrabajoService } from './trabajo.service';
import { CreateTrabajoDto } from './dto/trabajo.dto';

@Controller('trabajo')
export class TrabajoController {
  constructor(private readonly trabajoService: TrabajoService) {}
  @Get('/findAll')
  async findAll() {
    return await this.trabajoService.findAll();
  }

  @Get('/findById')
  findById(@Body() _id: string) {
    return this.trabajoService.findById(_id);
  }

  @Post('/join')
  join(@Body() {_idTrabajo, _idEquipo}:{_idTrabajo: string, _idEquipo: string}) {
    return this.trabajoService.join(_idTrabajo, _idEquipo);
  }


  @Get('/findByName')
  findByName(@Body() nombre: string) {
    return this.trabajoService.findByName(nombre);
  }

  @Post('/create')
  create(@Body() CreateTrabajoDto: CreateTrabajoDto) {
    return this.trabajoService.create(CreateTrabajoDto);
  }

  @Post(':id/delete')
  delete(@Param('id') _id: string) {
    return this.trabajoService.delete(_id);
  }
}

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

  @Get(':idTrabajo/:idEquipo/equipoOnTrabajo') // debe retornar un boolean
  equipoOnTrabajo(@Param('idTrabajo') _idTrabajo: string, @Param('idEquipo') _idEquipo: string) {
    return this.trabajoService.equipoOnTrabajo(_idTrabajo, _idEquipo);
  }
  @Post('/delete/:idTrabajo/:idUsuario')
  delete(@Param('idTrabajo') _idTrabajo: string, @Param('idUsuario') _idUsuario: string) {
    return this.trabajoService.delete(_idTrabajo);
  }
  

  @Get('/findByName')
  findByName(@Body() nombre: string) {
    return this.trabajoService.findByName(nombre);
  }

  @Post('/create')
  create(@Body() CreateTrabajoDto: CreateTrabajoDto) {
    return this.trabajoService.create(CreateTrabajoDto);
  }
}

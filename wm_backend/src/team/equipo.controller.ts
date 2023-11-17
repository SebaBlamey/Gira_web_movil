import { Controller, Get, Post, Body } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/equipo.dto';

@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Get('/findAll')
  async findAll() {
    return await this.equipoService.findAll();
  }

  @Post('/create')
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }
  
  @Post('/join')
  Join(@Body() _idTeam: string, _idUser: string, _role: string) {
    return this.equipoService.join(_idTeam, _idUser,_role);
  }

  @Get('/findById')
  findById(@Body() _id: string) {
    return this.equipoService.findById(_id);
  }

  @Get('/findByName')
  findByName(@Body() nombre: string) {
    return this.equipoService.findByName(nombre);
  }

  @Post('/delete')
  delete(@Body() _id: string) {
    return this.equipoService.delete(_id);
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
  Join(@Body() { _idTeam, _userEmail, _role }: { _idTeam: string, _userEmail: string, _role: string }) {
    console.log(`Buscando Team con ID: ${_idTeam}`)
    /*const team = this.equipoService.findById(_idTeam);
    if(team) {
      console.log('Equipoencontradp');
    }*/
    return this.equipoService.join(_idTeam, _userEmail,_role);
  }

  @Get(':id/findTeamsFromUserId')
  findTeamsFromUserId(@Param('id') _id: string) {
    return this.equipoService.findEquipoFromUser(_id);
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

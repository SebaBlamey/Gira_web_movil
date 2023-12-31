import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

  @Get('/findByName')
  findByName(@Body() nombre: string) {
    return this.equipoService.findByName(nombre);
  }

  @Get('findById/:id')
  findById(@Param('id') _id: string) {
    return this.equipoService.findById(_id); 
  }

  @Get(':id/findTeamsFromUserId')
  findTeamsFromUserId(@Param('id') _id: string) {
    return this.equipoService.findEquipoFromUser(_id);
  }

  @Get(':idTeam/:idUser/userOnTeam') // debe retornar un boolean
  userOnTeam(@Param('idTeam') _idTeam: string, @Param('idUser') _idUser: string) {
    return this.equipoService.userOnTeam(_idTeam, _idUser);
  }

  @Get(':idTeam/:idUser/roleOnTeam') // debe retornar un string
  roleOnTeam(@Param('idTeam') _idTeam: string, @Param('idUser') _idUser: string) {
    return this.equipoService.roleOnTeam(_idTeam, _idUser);
  }
  
  @Post('/join')
  Join(@Body() { _idTeam, _userEmail, _role }: { _idTeam: string, _userEmail: string, _role: string }) {
    /*const team = this.equipoService.findById(_idTeam);
    if(team) {
      console.log('Equipoencontradp');
    }*/
    return this.equipoService.join(_idTeam, _userEmail,_role);
  }

  @Post('/leave/:idEquipo/:idUsuario')
  leave(@Param('idEquipo') _idEquipo: string, @Param('idUsuario') _idUsuario: string) {
    return this.equipoService.deleteUserFromTeam(_idEquipo, _idUsuario);
  }

  @Delete('/delete/:idEquipo/:idUsuario')
  delete(@Param('idEquipo') _idEquipo: string, @Param('idUsuario') _idUsuario: string) {
    return this.equipoService.delete(_idEquipo, _idUsuario)
  }
}
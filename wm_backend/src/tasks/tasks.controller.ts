import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TasksDto } from './dto/tasks.dto';

@Controller('tasks')
export class TaskController {
  constructor(private tareaService: TaskService) {}

  @Post('create')
  async crearTarea(@Body() tareaDto: TasksDto) {
    return this.tareaService.crearTarea(tareaDto);
  }

  @Patch(':id/estado')
  async actualizarEstadoTarea(@Param('id') id: string, @Body('estado') estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO') {
    return this.tareaService.actualizarEstadoTarea(id, estado);
}
  @Patch(':id/usuarios')
  async agregarUsuariosTarea(@Param('id') id: string, @Body('usuarios') usuarios: { user: string}) {
    return this.tareaService.agregarUsuariosTarea(id, usuarios);
}

  @Post(':id/comentarios')
  async agregarComentarioTarea(@Param('id') id: string, @Body() comentario: { usuario: string, comentario: string }) {
    return this.tareaService.agregarComentarioTarea(id, comentario);
  }


  
}

import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TasksDto } from './dto/tasks.dto';
import { Task } from './entities/tasks.entity';

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

  @Get('user/:userId/tasks')
  async getTasksByUserId(@Param('userId') userId: string) {
    return this.tareaService.getTasksByUserId(userId);
  }

  @Get(':id') 
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tareaService.getTaskById(id);
  }

  @Patch(':id')
  async actualizarTarea(@Param('id') id: string, @Body() tareaDto: TasksDto): Promise<Task> {
    return this.tareaService.actualizarTarea(id, tareaDto);
  }
  
}

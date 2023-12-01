import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities//tasks.entity';
import { TasksDto } from './dto/tasks.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async crearTarea(taskDto: TasksDto): Promise<Task> {
    const task = new this.taskModel(taskDto);
    return task.save();
  }
  async actualizarEstadoTarea(id: string, estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO'): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { estado }, { new: true });
    return task;
  }

  async agregarUsuariosTarea(id: string, usuarios: { user: string }): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { $push: { userID: { $each: usuarios } } }, { new: true });
    return task;
  }

  async agregarComentarioTarea(id: string, comentario: { usuario: string, comentario: string }): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { $push: { comentarios: comentario } }, { new: true });
    return task;
  }
  
  
  
}

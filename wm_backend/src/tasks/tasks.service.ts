import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities//tasks.entity';
import { TasksDto } from './dto/tasks.dto';
import { Trabajo, TrabajoDocument } from 'src/proyect/entities/trabajo.entity';
import { User, UserDocument } from '../users/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Trabajo.name) private trabajoModel: Model<TrabajoDocument>,
    @InjectModel(User.name) private usuarioModel: Model<UserDocument>,
  ) {}

  async crearTarea(taskDto: TasksDto): Promise<Task> {
    const { proyectID, userID, ...rest } = taskDto;
    const trabajo = await this.trabajoModel.findById(proyectID);
    if (!trabajo) {
      throw new NotFoundException('El trabajo indicado no fue encontrado');
    }

    if (userID) {
      const usuario = await this.usuarioModel.findById(userID); 
      if (!usuario) {
        throw new NotFoundException('El usuario indicado no fue encontrado');
      }
    }
    const task = new this.taskModel({ proyectID, userID, ...rest });
    return task.save();
  }
  async actualizarEstadoTarea(id: string, estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO' | 'CERRADO'): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { estado }, { new: true });
    return task;
  }

  async actualizarFechaInicio(id: string, fechaInicio: ''): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { fechaInicio }, { new: true });
    return task;
  }

  async actualizarFechaFin(id: string, fechaFin: ''): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, { fechaFin }, { new: true });
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

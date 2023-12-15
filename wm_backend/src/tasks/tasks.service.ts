import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities//tasks.entity';
import { TasksDto } from './dto/tasks.dto';
import { Trabajo, TrabajoDocument } from 'src/proyect/entities/trabajo.entity';
import { User, UserDocument } from '../users/user.entity';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(Trabajo.name) private trabajoModel: Model<TrabajoDocument>,
    @InjectModel(User.name) private usuarioModel: Model<UserDocument>,
  ) {}

  async crearTarea(taskDto: TasksDto): Promise<Task> {
    const { nombre, nombreProyecto, emailUser, ...rest } = taskDto;
    try {
      const existingTask = await this.taskModel.findOne({ nombre });
      if (existingTask) {
        throw new ConflictException('Ya existe una tarea con el mismo nombre');
      }
  
      const trabajo = await this.trabajoModel.findOne({ nombre: nombreProyecto });
      if (!trabajo) {
        throw new NotFoundException('El trabajo indicado no fue encontrado');
      }
  
      const usuario = await this.usuarioModel.findOne({ email: emailUser });
      if (!usuario) {
        throw new NotFoundException('El usuario indicado no fue encontrado');
      }
  
      const task = new this.taskModel({ nombre, nombreProyecto, emailUser, ...rest });
      return task.save();
    } catch (error) {
      throw error;
    }
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

  async getTasksByUserId(userId: string): Promise<Task[]> {
    console.log(`Buscando tareas del usuario con id: ${userId}`)
    return this.taskModel.find({ userID: userId.toString() });
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('La tarea no fue encontrada');
    }
    return task;
  }
  
  async actualizarTarea(id: string, tareaDto: TasksDto): Promise<Task> {
    const tareaActualizada = await this.taskModel.findByIdAndUpdate(id, tareaDto, { new: true });
    if (!tareaActualizada) {
      throw new NotFoundException('La tarea no fue encontrada');
    }
    return tareaActualizada;
  }
  
}

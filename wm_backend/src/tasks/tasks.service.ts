import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './entities/tasks.entity';
import { CreateTaskDto, UpdateTaskDto, GetTasksDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = new this.taskModel(createTaskDto);
    const savedTask = await newTask.save();
    return savedTask;
  }

  async getTasks(getTasksDto: GetTasksDto) {
    const { search, responsible, status } = getTasksDto;
    const query = {};

    if (search) {
      query['title'] = { $regex: new RegExp(search, 'i') };
    }

    if (responsible) {
      query['responsible'] = responsible;
    }

    if (status) {
      query['status'] = status;
    }

    const tasks = await this.taskModel.find(query);
    return tasks;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    Object.assign(task, updateTaskDto);
    const savedTask = await task.save();
    return savedTask;
  }

  async deleteTask(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    task.isDeleted = true;
    const savedTask = await task.save();
    return savedTask;
  }
}

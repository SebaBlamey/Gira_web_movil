import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto, UpdateTaskDto, GetTasksDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      responsible: { id: createTaskDto.responsible },
    });
    const savedTask = await this.taskRepository.save(newTask);
    return savedTask;
  }

  async getTasks(getTasksDto: GetTasksDto) {
    //Buscar una tarea por titulo, responsable o estatus
    const { search, responsible, status } = getTasksDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (search) {
      query.andWhere('task.title LIKE :search', { search: `%${search}%` });
    }

    if (responsible) {
      query.andWhere('task.responsible = :responsible', { responsible });
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    const updatedTask = { ...task, ...updateTaskDto, responsible: { id: updateTaskDto.responsible } };
    const savedTask = await this.taskRepository.save(updatedTask);
    return savedTask;
  }

  async deleteTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    task.isDeleted = true;
    const savedTask = await this.taskRepository.save(task);
    return savedTask;
  }
}
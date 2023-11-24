import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, GetTasksDto } from './dto/tasks.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query() getTasksDto: GetTasksDto) {
    return this.tasksService.getTasks(getTasksDto);
  }
  
  @Put(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
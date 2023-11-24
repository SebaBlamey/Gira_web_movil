import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/tasks.entity';
import { User } from 'src/users/user.entity'; // Fix import path
import { Trabajo } from 'src/proyect/entities/trabajo.entity'; // Fix import path

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Trabajo])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
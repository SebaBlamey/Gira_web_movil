import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './entities/tasks.entity';
import { User, UserSchema } from 'src/users/user.entity';
import { Trabajo, TrabajoSchema } from 'src/proyect/entities/trabajo.entity'; 
import { DataSource } from 'typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: Trabajo.name, schema: TrabajoSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
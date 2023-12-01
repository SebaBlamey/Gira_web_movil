import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { Task, TaskSchema } from './entities/tasks.entity';
import { TrabajoModule } from '../proyect/trabajo.module';
import { Trabajo, TrabajoSchema } from 'src/proyect/entities/trabajo.entity';
import { UserModule } from 'src/users/user.module';
import { User, UserSchema } from 'src/users/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema },
                              {name: Trabajo.name, schema: TrabajoSchema},
                            {name: User.name, schema: UserSchema}

    ]),
    TrabajoModule,
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TasksModule {}

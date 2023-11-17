import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipoController } from './equipo.controller';
import { EquipoService } from './equipo.service';
import { Equipo, EquipoSchema } from './entities/equipo.entity';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.entity';
import { UserSchema } from 'src/users/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Equipo', schema: EquipoSchema }]),
    MongooseModule.forFeature([{name:User.name, schema: UserSchema}])
  ],
  controllers: [EquipoController],
  providers: [EquipoService, UserService],
  exports: [EquipoService],
})
export class EquipoModule {}

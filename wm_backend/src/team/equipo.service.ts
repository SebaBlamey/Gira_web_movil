import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipo, EquipoDocument } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/equipo.dto';
import { UserService } from 'src/users/user.service';
import { UserController } from 'src/users/user.controller';

@Injectable()
export class EquipoService {
  constructor(
    @InjectModel(Equipo.name) private equipoModel: Model<EquipoDocument>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Equipo[]> {
    return await this.equipoModel.find().exec();
  }

  async findById(userId: string): Promise<Equipo | null> {
    const { ObjectId } = require('mongodb');
    const id = new ObjectId(userId);
    return await this.equipoModel.findById({_id: id}).exec();
  }

  async findByName(nombre: string): Promise<Equipo | null> {
    return await this.equipoModel.findOne({ nombre: nombre }).exec();
  }

  async join(_idTeam: string, _idUser: string, _role: string) {
    const team = await this.equipoModel.findById(_idTeam);
    const user = await this.userService.findById(_idUser);
    const role = _role || 'Miembro';
    if (!team) {
      throw new Error('Equipo no encontrado');
    }
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    //team.integrantes.push(user._id);
    /*team.integrantes.push({
      user: user._id,
      role: role,
    });*/
    return team;
  }

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const { nombre, trabajoId, integrantes } = createEquipoDto;

    const existingEquipo = await this.equipoModel.findOne({ nombre });

    if (existingEquipo) {
      throw new Error('El equipo con este nombre ya existe');
    }

    const equipo = new this.equipoModel({ nombre, trabajo: trabajoId });

    if (integrantes && integrantes.length > 0) {
      const integrantesArray = integrantes.map(({userId, role}) => {
        return {
          user: userId,
          role: role || 'Miembro',
        }
      });

      equipo.integrantes = integrantesArray;

      // Actualiza los roles de los usuarios en el modelo de usuario
      await Promise.all(
        integrantes.map(async ({ userId, role }) => {
          const user = await this.userService.findById(userId);
          if (user) {
            user.equipos.push({
              equipoId: equipo._id,
              role: role || 'Miembro',
            });
            await user.save();
          }
        }),
      );
    }

    console.log(equipo);
    return equipo.save();

      }
  async delete(_id: string): Promise<Equipo> {
    return await this.equipoModel.findOneAndDelete({ _id });
  }
}

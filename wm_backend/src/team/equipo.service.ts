import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipo, EquipoDocument } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/equipo.dto';
import { UserService } from 'src/users/user.service';
import { Types } from 'mongoose';
import { Trabajo, TrabajoDocument } from 'src/proyect/entities/trabajo.entity';

@Injectable()
export class EquipoService {
  constructor(
    @InjectModel(Equipo.name) private equipoModel: Model<EquipoDocument>,
    private userService: UserService,
    @InjectModel(Trabajo.name)
    private trabajoModel: Model<TrabajoDocument>,
  ) {}

  async findAll(): Promise<Equipo[]> {
    return await this.equipoModel.find().exec();
  }

  async findById(teamId: string): Promise<Equipo | null> {
    console.log(`Buscando equipo con ID: ${teamId}`);
    return await this.equipoModel.findById(teamId).exec();
  }

  async findByName(nombre: string): Promise<Equipo | null> {
    return await this.equipoModel.findOne({ nombre: nombre }).exec();
  }

  async userOnTeam(_idTeam: string, _userEmail: string): Promise<boolean> {
    const equipo = await this.equipoModel.findById(_idTeam);
    if (!equipo) {
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }
    const user = await this.userService.findByEmail(_userEmail);
    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    const integrantes = equipo.integrantes;
    if (integrantes && integrantes.length > 0) {
      console.log('El equipo tiene integrantes');
      const alreadyInTeam = integrantes.some((integrante) =>
        integrante.user.equals(user._id),
      );
      if (alreadyInTeam) {
        console.log('El usuario está en el equipo');
        return true;
      }
    }
    return false;
  }

  async roleOnTeam(_idTeam: string, _userEmail: string): Promise<string> {
    const equipo = await this.equipoModel.findById(_idTeam);
    if (!equipo) {
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }
    const user = await this.userService.findByIdd(_userEmail);
    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    const integrantes = equipo.integrantes;
    if (integrantes && integrantes.length > 0) {
      const alreadyInTeam = integrantes.find((integrante) =>
        integrante.user.equals(user._id),
      );
      if (alreadyInTeam) {
        console.log('El usuario está en el equipo');
        return alreadyInTeam.role;
      }
    }
    return 'No está en el equipo';
  }

  async join(_idTeam: string, _userEmail: string, _role: string) {
    try {
      const team = await this.equipoModel.findById(_idTeam);
      if (!team) {
        console.log('Equipo no encontrado');
        throw new NotFoundException('Equipo no encontrado');
      }
      const user = await this.userService.findByEmail(_userEmail);
      if (!user) {
        console.log('Usuario no encontrado');
        throw new NotFoundException('Usuario no encontrado');
      }
      const integrantes = team.integrantes;

      if (integrantes && integrantes.length > 0) {
        console.log('El equipo tiene integrantes');
        const alreadyInTeam = integrantes.some((integrante) =>
          integrante.user.equals(user._id),
        );
        if (alreadyInTeam) {
          console.log('El usuario ya está en el equipo');
          throw ConflictException;
          return team;
        }
      }

      if (integrantes) {
        integrantes.push({ user: user._id, role: _role });
      } else {
        team.integrantes = [{ user: user._id, role: _role }];
      }
      await team.save();
      user.equipos.push({ equipoId: team._id, role: _role });
      await user.save();
      return team;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const { nombre, trabajoId, integrantes } = createEquipoDto;

    if (nombre == null) {
      console.log('El equipo debe tener un nombre');
      throw new ConflictException();
    }
    const existingEquipo = await this.equipoModel.findOne({ nombre });

    if (existingEquipo) {
      console.log('El equipo con este nombre ya existe');
      throw new ConflictException();
    }

    const equipo = new this.equipoModel({ nombre, trabajo: trabajoId });

    if (integrantes && integrantes.length > 0) {
      const integrantesArray = integrantes.map(({ userId, role }) => {
        return {
          user: new Types.ObjectId(userId),
          role: role || 'Miembro',
        };
      });

      equipo.integrantes = integrantesArray;

      // Actualiza los roles de los usuarios en el modelo de usuario
      await Promise.all(
        integrantes.map(async ({ userId, role }) => {
          const user = await this.userService.findByIdd(userId);
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

  async deleteUserFromTeam(_idTeam: string, _idUser: string): Promise<Equipo> {
    const equipo = await this.equipoModel.findById(_idTeam);
    if (!equipo) {
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }
    const user = await this.userService.findByIdd(_idUser);
    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    const integrantes = equipo.integrantes;
    if (integrantes && integrantes.length > 0) {
      console.log('El equipo tiene integrantes');
      const alreadyInTeam = integrantes.some((integrante) =>
        integrante.user.equals(user._id),
      );
      if (alreadyInTeam) {
        console.log('El usuario está en el equipo');
        equipo.integrantes = integrantes.filter(
          (integrante) => !integrante.user.equals(user._id),
        );
        await equipo.save();
        user.equipos = user.equipos.filter(
          (equipo) => !equipo.equipoId.equals(_idTeam),
        );
        await user.save();
        return equipo;
      }
    }
    console.log('El usuario no está en el equipo');
    return equipo;
  }

  async findEquipoFromUser(userId: string): Promise<Equipo[]> {
    console.log(`Buscando usuario con ID: ${userId}`);
    const user = await this.userService.findByIdd(userId);

    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }

    console.log('Usuario encontrado');
    const equipos = await this.equipoModel.find({ 'integrantes.user': userId });

    if (equipos.length === 0) {
      console.log('No está en un equipo');
    } else {
      console.log('Equipos del usuario:', equipos);
    }

    return equipos;
  }

  async findEquipoFromTrabajo(trabajoId: string): Promise<Equipo[]> {
    console.log(`Buscando trabajo con ID: ${trabajoId}`);
    const trabajo = await this.trabajoModel.findById(trabajoId);

    if (!trabajo) {
      console.log('Trabajo no encontrado');
      throw new NotFoundException('Trabajo no encontrado');
    }

    console.log(`Trabajo encontrado: ${trabajo.nombre}`);

    try {
      const equipo = await this.equipoModel.findOne({ trabajo: trabajoId });
      console.log('Equipo en el trabajo:', equipo);
      return equipo ? [equipo] : [];
    } catch (error) {
      console.error('Error al buscar equipos:', error);
      throw error;
    }
  }

  async deleteTrabajoFromEquipo(equipoId: string, trabajoId: string): Promise<Equipo> {
    const equipo = await this.equipoModel.findById(equipoId);
    if(!equipo){
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }
    const trabajo = await this.trabajoModel.findById(trabajoId);
    if(!trabajo){
      console.log('Trabajo no encontrado');
      throw new NotFoundException('Trabajo no encontrado');
    }
    equipo.trabajo = null;
    return equipo
  }

  async delete(_idTeam: string, _idUsuario: string): Promise<boolean> {
    const deletedTeam = await this.findById(_idTeam);

    if (!deletedTeam) {
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }

    const role = await this.roleOnTeam(_idTeam, _idUsuario);
    if (role !== 'Admin') {
      console.log('No tiene permisos para eliminar el equipo');
      throw new ConflictException('No tiene permisos para eliminar el equipo');
    }

    if (deletedTeam.integrantes && deletedTeam.integrantes.length > 0) {
      const users = await this.userService.findUsersByEquipoId(_idTeam);
      await Promise.all(
        users.map(async (user) => {
          this.userService.deleteEquipoFromUser(user._id, _idTeam);
        }),
      );
    }

    const deleted = await this.equipoModel.deleteOne({ _id: _idTeam }).exec();
    if (deleted.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  }
}

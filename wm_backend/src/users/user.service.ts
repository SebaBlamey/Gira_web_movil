import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { sendEmail } from 'src/microservices/email/email.sender';
import { Equipo, EquipoDocument } from 'src/team/entities/equipo.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    public userModel: Model<User>,
    @InjectModel(Equipo.name)
    private equipoModel: Model<EquipoDocument>,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).exec();
  }
   async findById2(userId: string): Promise<User | null> {
    const { ObjectId } = require('mongodb');
    const id = new ObjectId(userId);
    return await this.userModel.findById(id).exec();
  }
  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  async sendEmail(to:string, subject:string, body:string): Promise<void> {
    return await sendEmail(to, subject, body)
  }

  async findUsersByEquipoId(equipoId: string): Promise<User[]> {
    const equipo = await this.equipoModel.findById(equipoId);
    if (!equipo) {
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }
    const users = await this.userModel.find({ equipos: { $elemMatch: { equipoId: equipoId } } });
    if (users.length === 0) {
      console.log('No hay usuarios en el equipo');
    } else {
      console.log('Usuarios en el equipo:', users);
    }
    return users;
  }

  async deleteEquipoFromUser(userId: string, equipoId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      console.log('Usuario no encontrado');
      throw new NotFoundException('Usuario no encontrado');
    }
    const equipo = await this.equipoModel.findById(equipoId);
    if (!equipo) {
      console.log('Equipo no encontrado');
      throw new NotFoundException('Equipo no encontrado');
    }
    const integrantes = equipo.integrantes;
    if (integrantes && integrantes.length > 0) {
      console.log('El equipo tiene integrantes');
      const alreadyInTeam = integrantes.some((integrante) => integrante.user.equals(user._id));
      if (alreadyInTeam) {
        console.log('El usuario está en el equipo');
        equipo.integrantes = integrantes.filter((integrante) => !integrante.user.equals(user._id));
        await equipo.save();
        user.equipos = user.equipos.filter((equipo) => !equipo.equipoId.equals(equipoId));
        await user.save();
        return user;
      }
    }
    console.log('El usuario no está en el equipo');
    return user;
  }

  async findUserTeams(userId: string): Promise<Equipo[]> {
    console.log(`Buscando usuario con ID: ${userId}`);
    const user = await this.userModel.findById(userId);
  
    if (!user) {
      console.log('Usuario no encontrado');
      throw new Error('Usuario no encontrado');
    }
    const equipos = await this.equipoModel.find({ integrantes: userId });
  
    if (equipos.length === 0) {
      console.log('No está en un equipo');
    } else {
      console.log('Equipos del usuario:', equipos);
    }
  
    return equipos;
  }
}

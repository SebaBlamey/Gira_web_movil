import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipo, EquipoDocument } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/equipo.dto';

@Injectable()
export class EquipoService {
  constructor(
    @InjectModel(Equipo.name) private equipoModel: Model<EquipoDocument>,
  ) {}

  async findAll(): Promise<Equipo[]> {
    return await this.equipoModel.find().exec();
  }

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const existingEquipo = await this.equipoModel.findOne({ nombre: createEquipoDto.nombre });
  
    if (existingEquipo) {
      throw new Error('El equipo con esta ID ya existe');
    }
  
    const equipo = new this.equipoModel(createEquipoDto);
    console.log(equipo);
    return equipo.save();
  }
  async delete(_id: string): Promise<Equipo> {
    return await this.equipoModel.findOneAndDelete({ _id });
  }
}

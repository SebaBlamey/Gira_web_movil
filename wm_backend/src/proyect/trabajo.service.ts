import { Injectable } from '@nestjs/common';
import { Trabajo } from './entities/trabajo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TrabajoDocument } from './entities/trabajo.entity';
import { Model } from 'mongoose';
import { EquipoService } from 'src/team/equipo.service';
import { CreateTrabajoDto } from './dto/trabajo.dto';

@Injectable()
export class TrabajoService {
  constructor(
    @InjectModel(Trabajo.name) private trabajoModel: Model<TrabajoDocument>,
    private equipoService: EquipoService,
  ){}

  async findAll(): Promise<Trabajo[]> {
    return await this.trabajoModel.find().exec();
  }

  async findById(_id: string): Promise<Trabajo | null> {
    return await this.trabajoModel.findById(_id).exec();
  }

  async findByName(nombre: string): Promise<Trabajo | null> {
    return await this.trabajoModel.findOne({ nombre: nombre }).exec();
  }

  async create(CreateTrabajoDto: CreateTrabajoDto) : Promise<Trabajo> {
    const trabajo = new this.trabajoModel(CreateTrabajoDto);
    return await trabajo.save();
  }

  async delete(_id: string) {
    return await this.trabajoModel.findByIdAndDelete(_id);
  }
  
}

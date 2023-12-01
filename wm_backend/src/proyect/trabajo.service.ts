import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Trabajo } from './entities/trabajo.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TrabajoDocument } from './entities/trabajo.entity';
import { Model, Types } from 'mongoose';
import { EquipoService } from 'src/team/equipo.service';
import { CreateTrabajoDto } from './dto/trabajo.dto';
import { EquipoModule } from 'src/team/equipo.module';

@Injectable()
export class TrabajoService {
  constructor(
    @InjectModel(Trabajo.name) private trabajoModel: Model<TrabajoDocument>,
    private equipoService: EquipoService,
  ){}

  async findAll(): Promise<Trabajo[]> {
    try {
      return await this.trabajoModel.find().exec();
    } catch (error) {
      console.error('Error al buscar trabajos:', error);
      throw error; 
    }
  }
  async findById(_id: string): Promise<Trabajo | null> {
    return await this.trabajoModel.findById(_id).exec();
  }

  async findByName(nombre: string): Promise<Trabajo | null> {
    return await this.trabajoModel.findOne({ nombre: nombre }).exec();
  }

  async join(_idTrabajo: string, _idEquipo: string) {
    try {
      const trabajo = await this.trabajoModel.findById(_idTrabajo);
      if (!trabajo) {
        console.log('Trabajo no encontrado');
        throw new NotFoundException('Trabajo no encontrado');
      }
      console.log('Trabajo encontrado');
  
      const equipo = await this.equipoService.findById(_idEquipo);
      if (!equipo) {
        console.log('Equipo no encontrado');
        throw new NotFoundException('Equipo no encontrado');
      }
      console.log('Equipo encontrado');
  
      const equipos = trabajo.equipos;
  
      if (equipos && equipos.length > 0) {
        console.log('El trabajo tiene equipos');
        const alreadyInTrabajo = equipos.some((equipo) => equipo.Equipo.equals(_idEquipo));
        if (alreadyInTrabajo) {
          console.log('El equipo ya está en el trabajo');
          return trabajo;
        }
      }
      let newId = new Types.ObjectId(_idEquipo);
      if (equipos) {
        equipos.push({ Equipo: newId });
      } else {
        trabajo.equipos = [{ Equipo: newId }];
      }
      await trabajo.save();
      equipo.trabajo = trabajo;
      await equipo.save();
  
      return trabajo;
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.message);
    }
  }
  
  

  async create(CreateTrabajoDto: CreateTrabajoDto): Promise<Trabajo> {
    const { nombre, equipos } = CreateTrabajoDto;
  
    if (nombre == null) {
      console.log('El proyecto debe tener un nombre');
      throw new Error('El proyecto debe tener un nombre');
    }
  
    const existingProject = await this.trabajoModel.findOne({ nombre: nombre });
  
    if (existingProject) {
      console.log('El proyecto ya existe');
      throw new ConflictException('El proyecto ya existe');
    }
  
    const trabajo = new this.trabajoModel({ nombre, equipos: [] });
  
    if (equipos && equipos.length > 0) {
      const equiposIds = equipos.map(async ({ equipoId }) => {
        const equipo = await this.equipoService.findById(equipoId);
        if (equipo) {
          equipo.trabajo = trabajo;
          await equipo.save();
          trabajo.equipos.push({ Equipo: equipo._id });
        }
      });
  
      await Promise.all(equiposIds);
    }
    console.log('Trabajo creado');
    return trabajo.save();
  }
  


  async delete(_id: string): Promise<boolean> {
    const deletedTrabajo = await this.findById(_id);
  
    if (!deletedTrabajo) {
      console.log('Trabajo no encontrado');
      throw new NotFoundException('Trabajo no encontrado');
    }
  
    if (deletedTrabajo.equipos && deletedTrabajo.equipos.length > 0) {
      console.log('El trabajo tiene equipos');
  
      await Promise.all(
        deletedTrabajo.equipos.map(async (equipoObj) => {
          const equipo = await this.equipoService.findById(equipoObj.Equipo.toString());
          if (equipo) {
            equipo.trabajo = null;
            await equipo.save();
          }
        }),
      );
    }
  
    const deleted = await this.trabajoModel.deleteOne({ _id: _id }).exec();
  
    return deleted.deletedCount === 1;
  }
  
}

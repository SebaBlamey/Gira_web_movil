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
  async findById(trabajoId: string): Promise<Trabajo | null> {
    console.log(`Buscando trabajo con ID: ${trabajoId}`);
    return await this.trabajoModel.findById(trabajoId).exec();
  }

  async equipoOnTrabajo(_idTrabajo: string, _idEquipo: string): Promise<boolean> {
    const trabajo = await this.findById(_idTrabajo);
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
        return true;
      }
    }
    return false;
  }

  async findByName(nombre: string): Promise<Trabajo | null> {
    return await this.trabajoModel.findOne({ nombre: nombre }).exec();
  }

  async join(_idTrabajo: string, _idEquipo: string) {
    try {
      const trabajo = await this.trabajoModel.findById(_idTrabajo);
      if (!trabajo) {
        console.log(`Trabajo con ID ${_idTrabajo} no encontrado`);
        throw new NotFoundException('Trabajo no encontrado');
      }
      console.log('Trabajo encontrado');
  
      const equipo = await this.equipoService.findById(_idEquipo);
      if (!equipo) {
        console.log(`Equipo con ID ${_idEquipo} no encontrado`);
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
    const { nombre, descripcion, creador, equipos } = CreateTrabajoDto;
  
    if (nombre == null) {
      console.log('El proyecto debe tener un nombre');
      throw new Error('El proyecto debe tener un nombre');
    }
  
    const existingProject = await this.trabajoModel.findOne({ nombre });
  
    if (existingProject) {
      console.log('El proyecto ya existe');
      throw new ConflictException();
    }

    console.log(`Equipos: ${equipos}`)
    const trabajo = new this.trabajoModel({ nombre,descripcion,creador});
    
    if (equipos && equipos.length > 0) {
      const equiposArray = equipos.map(({ equipoId }) => {
        return {
          Equipo: new Types.ObjectId(equipoId),
        };
      });
      trabajo.equipos = equiposArray;
    }
    
    console.log('Trabajo creado');
    return trabajo.save();
  }
  


  async delete(_idTrabajo: string): Promise<boolean> {
    const deletedTrabajo = await this.findById(_idTrabajo);
    if (!deletedTrabajo) {
      console.log('Trabajo no encontrado');
      throw new NotFoundException('Trabajo no encontrado');
    }
    if(deletedTrabajo.equipos && deletedTrabajo.equipos.length > 0 ){
      const equipo = await this.equipoService.findEquipoFromTrabajo(_idTrabajo);
      await Promise.all(
        equipo.map(async (equipo) => {
          this.equipoService.deleteTrabajoFromEquipo(equipo._id, _idTrabajo);
        }
      ),
      );
    }
    const deleted = await this.trabajoModel.deleteOne({ _id: _idTrabajo }).exec();
    return deleted.deletedCount > 0;
  }
}

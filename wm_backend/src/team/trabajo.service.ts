import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajo } from './entities/trabajo.entity';
import { CreateEquipoDto, UpdateEquipoDto } from './dto/equipo.dto';

@Injectable()
export class TrabajoService {
  constructor(
    @InjectRepository(Trabajo)
    private trabajoRepository: Repository<Trabajo>,
  ) {}

  async getEquipos(trabajoId: number) {
    // Implementa la lógica para obtener los equipos de un trabajo.
  }

  async createEquipo(trabajoId: number, createEquipoDto: CreateEquipoDto) {
    // Implementa la lógica para crear un equipo en un trabajo.
  }

  async updateEquipo(trabajoId: number, equipoId: number, updateEquipoDto: UpdateEquipoDto) {

  }

  async deleteEquipo(trabajoId: number, equipoId: number) {
    // Implementa la lógica para eliminar un equipo de un trabajo.
  }
}

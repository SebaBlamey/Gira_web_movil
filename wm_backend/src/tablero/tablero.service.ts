import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tablero } from './entities/tablero.entity';
import { CreateTableroDto } from './dto/create-tablero.dto';

@Injectable()
export class TableroService{
    constructor(
        @InjectRepository(Tablero)
        private tableroRepository: Repository<Tablero>,
    ){}

    async findAll(): Promise<Tablero[]>{
        return await this.tableroRepository.find();
    }

    async create(createTableroDto: CreateTableroDto): Promise<Tablero>{
        const tablero = new Tablero();
        tablero.nombre = createTableroDto.tableroName;
        tablero.ownerId = createTableroDto.tableroOwnerId;
        return this.tableroRepository.save(tablero);
    }
}
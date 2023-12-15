import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsOptional } from "class-validator";
import {Type} from 'class-transformer'

class EquipoDto{
    @IsNotEmpty()
    @IsString()
    equipoId: string;
}

export class CreateTrabajoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    creador: string

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => EquipoDto)
    equipos: EquipoDto[];
}
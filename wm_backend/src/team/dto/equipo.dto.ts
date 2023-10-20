import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEquipoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  trabajoId: number;
}

export class UpdateEquipoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  trabajoId: number;
}

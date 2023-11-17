import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class IntegranteDto{
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  role?: string;
}

export class CreateEquipoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  trabajoId: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => IntegranteDto)
  integrantes?: IntegranteDto[];
}

export class UpdateEquipoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  trabajoId: number;
}

import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
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
  @IsString()
  @IsOptional()
  trabajoId?: string;

  @IsArray()
  @ValidateNested({each: true})
  @IsOptional()
  @Type(() => IntegranteDto)
  integrantes?: IntegranteDto[];
}

export class UpdateEquipoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  trabajoId: number;
}

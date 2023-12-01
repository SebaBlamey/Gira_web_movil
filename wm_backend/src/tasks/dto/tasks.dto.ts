import { IsString, IsNotEmpty, IsOptional } from 'class-validator';


export class TasksDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  proyectID?: string;

  @IsString()
  @IsOptional()
  userID?: string;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsString()
  @IsNotEmpty()
  estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO';
}

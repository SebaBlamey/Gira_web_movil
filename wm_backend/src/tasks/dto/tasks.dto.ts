import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Trabajo } from 'src/proyect/entities/trabajo.entity';
import { User } from 'src/users/user.entity';


export class TasksDto {

  @IsOptional()
  createTaskId?:User;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  fechaInicio?:string;

  @IsString()
  @IsOptional()
  fechaFin?:string;

  @IsString()
  @IsNotEmpty()
  proyectID: Trabajo;

  @IsString()
  @IsOptional()
  userID?: User;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsString()
  @IsNotEmpty()
  estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO' | 'CERRADO';
}

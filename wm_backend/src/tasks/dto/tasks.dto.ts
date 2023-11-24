import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  responsible: string;

  @IsNotEmpty()
  projectId: number;
}

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  responsible: string;

  @IsOptional()
  projectId: number;

  @IsOptional()
  status: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}

export class GetTasksDto {
  @IsOptional()
  search: string;

  @IsOptional()
  responsible: string;

  @IsOptional()
  status: string;
}
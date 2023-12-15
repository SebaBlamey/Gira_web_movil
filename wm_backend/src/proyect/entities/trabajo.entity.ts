import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Equipo, EquipoDocument } from '../../team/entities/equipo.entity';
import { IsOptional } from 'class-validator';

@Schema({ collection: 'trabajos' })
export class Trabajo extends Document {
  @Prop()
  nombre: string;

  @Prop()
  creador: string;
  
  @Prop()
  @IsOptional()
  descripcion?: string;

  @Prop({ type: [{ Equipo: {type: Types.ObjectId, ref: 'Equipo'} }] }) 
  equipos?: { Equipo: Types.ObjectId }[];

  
}

export const TrabajoSchema = SchemaFactory.createForClass(Trabajo);

export type TrabajoDocument = Trabajo & Document;

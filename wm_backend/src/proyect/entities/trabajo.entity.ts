import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Equipo, EquipoDocument } from '../../team/entities/equipo.entity';

@Schema({ collection: 'trabajos' })
export class Trabajo extends Document {
  @Prop()
  nombre: string;

  // agrega una descripcion al trabajo
  @Prop()
  descripcion: string;

  @Prop({ type: [{ Equipo: {type: Types.ObjectId, ref: 'Equipo'} }] }) 
  equipos?: { Equipo: Types.ObjectId }[];
}

export const TrabajoSchema = SchemaFactory.createForClass(Trabajo);

export type TrabajoDocument = Trabajo & Document;

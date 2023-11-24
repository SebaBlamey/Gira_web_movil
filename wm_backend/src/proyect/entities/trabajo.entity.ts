import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Equipo } from '../../team/entities/equipo.entity';

@Schema({ collection: 'trabajos' })
export class Trabajo extends Document {
  @Prop()
  nombre: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Equipo' }] }) 
  equipos: Equipo[];

}

export const TrabajoSchema = SchemaFactory.createForClass(Trabajo);

export type TrabajoDocument = Trabajo & Document;

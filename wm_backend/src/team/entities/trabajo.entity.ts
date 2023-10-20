import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Equipo } from './equipo.entity';

@Schema({ collection: 'trabajos' })
export class Trabajo extends Document {
  @Prop()
  nombre: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Equipo' }] }) 
  equipos: Equipo[];

}

export const TrabajoSchema = SchemaFactory.createForClass(Trabajo);

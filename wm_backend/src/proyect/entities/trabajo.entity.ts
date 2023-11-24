import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Equipo, EquipoDocument } from '../../team/entities/equipo.entity';

@Schema({ collection: 'trabajos' })
export class Trabajo extends Document {
  @Prop()
  nombre: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Equipo' }] }) 
  equipos: Types.Array<Record<string, unknown> | EquipoDocument>;
}

export const TrabajoSchema = SchemaFactory.createForClass(Trabajo);

export type TrabajoDocument = Trabajo & Document;

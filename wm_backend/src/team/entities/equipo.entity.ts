import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Trabajo } from '../../proyect/entities/trabajo.entity';


@Schema({ collection: 'equipos' })
export class Equipo extends Document {
  @Prop()
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Trabajo', default: null })
  trabajo?: Trabajo;

  @Prop({ type: [{ user: { type: Types.ObjectId, ref: 'User' }, role: String }] })
  integrantes?: { user: Types.ObjectId, role: string }[];
}

export const EquipoSchema = SchemaFactory.createForClass(Equipo);

export type EquipoDocument = Equipo & Document;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Trabajo } from './trabajo.entity';
import { User } from 'src/users/user.entity';


@Schema({ collection: 'equipos' })
export class Equipo {
  @Prop()
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Trabajo', default: null })
  trabajo?: Trabajo;

  @Prop()
  integrantes?: {
    user: string,
    role: string, 
  }[];
}

export const EquipoSchema = SchemaFactory.createForClass(Equipo);

export type EquipoDocument = Equipo & Document;

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Trabajo } from 'src/proyect/entities/trabajo.entity';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Trabajo', default: null, required: false })
  proyectID?: string;

  @Prop({ type: [{ user: { type: Types.ObjectId, ref: 'User' }}] })
  userID?: { user: Types.ObjectId };

  @Prop()
  observacion?: string;

  @Prop({ required: true })
  estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO';

  @Prop({ type: [{ usuario: { type: Types.ObjectId, ref: 'User' }, comentario: String }] })
  comentarios?: { usuario: Types.ObjectId, comentario: string }[];

}


export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = Task & Document
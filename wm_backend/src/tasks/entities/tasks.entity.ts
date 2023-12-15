import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Trabajo } from 'src/proyect/entities/trabajo.entity';
import { User } from 'src/users/user.entity';

@Schema()
export class Task extends Document {



  @Prop({ type: Types.ObjectId, ref: 'User' ,required:true})
  createTaskId: User

  @Prop({ required: true,unique:true})
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Trabajo', default: null })
  nombreProyecto: Trabajo;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  emailUser?: User;

  @Prop()
  observacion?: string;

  @Prop({ required: false }) 
  fechaInicio?: string;

  @Prop({ required: false }) 
  fechaFin?: string;

  @Prop({ required: true })
  estado: 'PENDIENTE' | 'EN PROCESO' | 'COMPLETADO' | 'CERRADO';

  @Prop({ type: [{ usuario: { type: Types.ObjectId, ref: 'User' }, comentario: String }] })
  comentarios?: { usuario: Types.ObjectId, comentario: string }[];

}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = Task & Document
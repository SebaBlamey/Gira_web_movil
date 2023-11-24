import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.entity';
import { Trabajo } from 'src/proyect/entities/trabajo.entity';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  creator: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  responsible: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Trabajo', required: true })
  trabajo: Trabajo;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: Date, default: null })
  startDate: Date;

  @Prop({ type: Date, default: null })
  endDate: Date;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = Task & Document;
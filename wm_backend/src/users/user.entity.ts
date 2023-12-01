import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  creationDate: Date;

  @Prop({nulleable:true})
  recoveryCode: string;

  @Prop({ nullable: true })
  recoveryCodeExpiration: Date;

  @Prop()
  token: string;

  @Prop([
    {
      equipoId: { type: MongooseSchema.Types.ObjectId, ref: 'Equipo' },
      role: { type: String, default: 'Miembro' },
    },
  ])
  equipos: { equipoId: Types.ObjectId, role: string }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document

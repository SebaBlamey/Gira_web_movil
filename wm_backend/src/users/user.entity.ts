import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);

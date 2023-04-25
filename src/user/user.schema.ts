import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  email: string;

  @Prop({
    required: true,
  })
  gender: number;

  @Prop({
    required: true,
  })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';

export type FlightDocument = HydratedDocument<Flight>;

@Schema({
  timestamps: true,
})
export class Flight {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  userId: User;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  gender: number;

  @Prop()
  phone: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  price: string;

  @Prop()
  adults: Array<IAdults>;

  @Prop()
  children: number;

  @Prop()
  babies: number;

  @Prop()
  dateFrom: Date;

  @Prop()
  dateTo: Date;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);

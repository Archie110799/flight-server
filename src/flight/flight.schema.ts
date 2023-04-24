import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FlightDocument = HydratedDocument<Flight>;

@Schema({
  timestamps: true,
})
export class Flight {
  @Prop()
  userId: string;

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

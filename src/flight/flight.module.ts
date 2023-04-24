import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  providers: [FlightService],
  controllers: [FlightController]
})
export class FlightModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from './flight.schema';
import { CreateFlightDto } from './flight.dto';
import { Message } from 'src/common/constants';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private readonly flightModel: Model<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    try {
      const createdFlight = await this.flightModel.create(createFlightDto);
      if (!createdFlight) {
        throw new HttpException('NOT_MODIFIED', HttpStatus.NOT_MODIFIED);
      } else {
        return createdFlight;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: error?.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findAll(): Promise<Flight[]> {
    return this.flightModel.find().exec();
  }

  async findAllbyUser(userId: string): Promise<Flight[]> {
    return this.flightModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<Flight> {
    return this.flightModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.flightModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}

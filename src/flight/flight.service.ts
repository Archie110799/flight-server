import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from './flight.schema';
import HttpException from 'src/common/exception/http-exception';
import { CreateFlightDto } from './flight.dto';
import { Message } from 'src/common/constants';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private readonly flightModel: Model<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const createdUser = await this.flightModel.create(createFlightDto);
    if (!createdUser) {
      throw new HttpException(404, Message.error[404]);
    } else {
      return createdUser;
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

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFlightDto } from './flight.dto';
import { FlightService } from './flight.service';
import { Flight } from './flight.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Flight')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}
  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }
  @Get()
  async findAll(): Promise<Flight[]> {
    return this.flightService.findAll();
  }

  @Get(':userId')
  async findAllbyUser(@Param('userId') userId: string): Promise<Flight[]> {
    return this.flightService.findAllbyUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Flight> {
    return this.flightService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }
}

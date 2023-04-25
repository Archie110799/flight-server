import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiQuery({ name: 'req' })
  getHello(@Query('req') req) {
    return this.appService.getHello(req);
  }

  @Get('/provinces')
  getProvinces() {
    return this.appService.getProvinces();
  }
}

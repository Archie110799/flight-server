import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      // 'mongodb+srv://admin:admin@cluster-flight.lm16jaz.mongodb.net/test',
      'mongodb://localhost:27017/',
    ),
    UserModule,
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

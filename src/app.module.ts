import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FlightModule } from './flight/flight.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { FlightController } from './flight/flight.controller';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(FlightController);
  }
}

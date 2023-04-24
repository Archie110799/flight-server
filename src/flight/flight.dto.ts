import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly gender: number;
  readonly phone: string;
  readonly from: string;
  readonly to: string;
  readonly price: string;
  readonly adults: Array<IAdults>;
  readonly children: number;
  readonly babies: number;

  @Type(() => Date)
  @IsDate()
  readonly dateFrom: Date;

  @Type(() => Date)
  @IsDate()
  readonly dateTo: Date;
}

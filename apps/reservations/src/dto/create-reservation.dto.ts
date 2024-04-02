import { Types } from 'mongoose';
import { IsDate, IsMongoId } from 'class-validator';
import {} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsMongoId()
  placeId: Types.ObjectId;
  @IsMongoId()
  invoiceId: Types.ObjectId;
  @IsDate()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}

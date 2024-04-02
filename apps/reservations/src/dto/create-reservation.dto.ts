import { Types } from 'mongoose';

export class CreateReservationDto {
  placeId: Types.ObjectId;
  invoiceId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

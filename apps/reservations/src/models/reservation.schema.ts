import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class ReservationDocument extends AbstractDocument {
  @Prop({
    ref: 'User',
    type: SchemaTypes.ObjectId,
  })
  userId: Types.ObjectId;

  @Prop({
    ref: 'Place',
    type: SchemaTypes.ObjectId,
  })
  placeId: Types.ObjectId;

  @Prop({
    ref: 'Invoice',
    type: SchemaTypes.ObjectId,
  })
  invoiceId: Types.ObjectId;

  @Prop({
    type: SchemaTypes.Date,
  })
  startDate: Date;

  @Prop({
    type: SchemaTypes.Date,
  })
  endDate: Date;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);

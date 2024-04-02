import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { Types } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      userId: new Types.ObjectId(),
      placeId: new Types.ObjectId(),
      invoiceId: new Types.ObjectId(),
    });
  }

  findAll() {
    console.log('RUNNN!!!');
    return this.reservationRepository.findAll();
  }

  findOne(_id: string) {
    return this.reservationRepository.findOneById(_id);
  }

  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...updateReservationDto,
          placeId: new Types.ObjectId(),
          invoiceId: new Types.ObjectId(),
        },
      },
    );
  }

  remove(_id: string) {
    return this.reservationRepository.remove(_id);
  }
}

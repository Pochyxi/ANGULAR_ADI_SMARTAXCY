import { Reservation } from './Reservation';

export class CalendarReservation {
  date: string;
  reservationDTO: Reservation;

  constructor() {
    this.date = '';
    this.reservationDTO = new Reservation();
  }
}

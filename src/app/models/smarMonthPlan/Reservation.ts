export class Reservation {
  id: number;
  employeeId: number;
  calendarId: string;
  officeId: number | null;
  clientId: number | null;
  reservationTypeName: string;
  isSmart: boolean;

  constructor() {
    this.id = 0;
    this.employeeId = 0;
    this.calendarId = '';
    this.officeId = 0;
    this.clientId = 0;
    this.reservationTypeName = '';
    this.isSmart = false;
  }
}

import { CalendarReservation } from './CalendarReservation';
import { Employee } from '../Employee';

export class EmployeeReservation {
  employeeDTO: Employee;
  calendarReservationList: CalendarReservation[];

  constructor() {
    this.employeeDTO = new Employee();
    this.calendarReservationList = [];
  }
}

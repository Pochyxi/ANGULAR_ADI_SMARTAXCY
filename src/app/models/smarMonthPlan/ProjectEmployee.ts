import { EmployeeReservation } from './EmployeeReservation';

export class ProjectEmployee {
  projectName: string;
  employeeDTOList: EmployeeReservation[];
  reservedPercentage: number;

  constructor() {
    this.projectName = '';
    this.employeeDTOList = [];
    this.reservedPercentage = 0;
  }
}

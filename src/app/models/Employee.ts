export class Employee {
  name: string;
  surname: string;
  blockedFrom: Date | null;
  blockedTo: Date | null;
  userId: number;
  projectName: string;

  constructor() {
    this.name = '';
    this.surname = '';
    this.blockedFrom = null;
    this.blockedTo = null;
    this.userId = 0;
    this.projectName = '';
  }
}

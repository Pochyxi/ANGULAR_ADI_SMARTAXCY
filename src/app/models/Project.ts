export class Project {
  id: number;
  name: string;
  blockedFrom: Date;
  blockedTo: Date;

  constructor() {
    this.id = 0;
    this.name = '';
    this.blockedFrom = new Date();
    this.blockedTo = new Date();
  }
}

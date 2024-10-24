import { ProjectEmployee } from './ProjectEmployee';
import { OfficeInfo } from './OfficeInfo';
import { ClientInfo } from './ClientInfo';

export class SmartMonthPlan {
  timeLimit: string;
  projectEmployeeDTOList: ProjectEmployee[];
  officeInfoList: OfficeInfo[];
  clientInfoList: ClientInfo[];
  totalReservedPercentage: number;

  constructor() {
    this.timeLimit = '';
    this.projectEmployeeDTOList = [];
    this.officeInfoList = [];
    this.clientInfoList = [];
    this.totalReservedPercentage = 0;
  }
}

import { Office } from '../Office';
import { CalendarInfo } from './CalendarInfo';

export class OfficeInfo {
  officeDTO: Office;
  calendarInfoList: CalendarInfo[];

  constructor() {
    this.officeDTO = new Office();
    this.calendarInfoList = [];
  }
}

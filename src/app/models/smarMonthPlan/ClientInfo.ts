import { Client } from '../Client';
import { CalendarInfo } from './CalendarInfo';

export class ClientInfo {
  clientDTO: Client;
  calendarInfoList: CalendarInfo[];

  constructor() {
    this.clientDTO = new Client();
    this.calendarInfoList = [];
  }
}

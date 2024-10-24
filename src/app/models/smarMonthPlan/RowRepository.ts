import * as ExcelJS from 'exceljs';

export interface RowRepository {
  [key: string]: {
    [key: string]: ExcelJS.Cell;
  };
}

import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private rootapiurl = environment.ROOTAPIURL;
  private employeeapiurl = environment.EMPLOYEEAPIURL;
  private employeesapiurl = environment.EMPLOYEESAPIURL;
  private employeecreateapiurl = environment.EMPLOYEECREATEAPIURL;
  private employeemodifyapiurl = environment.EMPLOYEEMODIFYAPIURL;
  private employeedeleteapiurl = environment.EMPLOYEEDELETEAPIURL;
  private employeeunblockapiurl = environment.EMPLOYEEUNBLOCKAPIURL;

  private employeeSubject = new BehaviorSubject<Employee>(new Employee());

  constructor(private http: HttpClient) {}

  // GETTER/SETTER
  get employee$() {
    return this.employeeSubject.asObservable();
  }

  setEmployee(employee: Employee) {
    this.employeeSubject.next(employee);
  }

  // METODI PUBLIC

  // METODO PER OTTENERE UN EMPLOYEE, RITORNA UN OBSERVABLE
  getEmployeeById(id: string) {
    return this.http.get<Employee>(
      this.rootapiurl + this.employeeapiurl + '/' + id,
    );
  }

  createEmployee(employee: Employee) {
    return this.http.post<Employee>(
      this.rootapiurl + this.employeecreateapiurl,
      employee,
    );
  }

  modifyEmployee(employee: Employee) {
    return this.http.put<Employee>(
      this.rootapiurl + this.employeemodifyapiurl + '/' + employee.userId,
      employee,
    );
  }

  deleteEmployee(userId: string) {
    return this.http.delete<Employee>(
      this.rootapiurl + this.employeedeleteapiurl + '/' + userId,
    );
  }

  unblockEmployee(userId: number) {
    return this.http.put<Employee>(
      this.rootapiurl + this.employeeunblockapiurl + '/' + userId,
      {},
    );
  }
}

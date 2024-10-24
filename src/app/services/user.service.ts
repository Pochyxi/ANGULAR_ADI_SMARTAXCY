import { Injectable } from '@angular/core';
import { PaginatedGeneric } from '../models/PaginatedGeneric';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // URL APIs
  rootApiUrl = environment.ROOTAPIURL;

  // USER API URL
  userApiUrl = environment.USERAPIURL;

  // USERS API URL
  usersApiUrl = environment.USERSAPIURL;

  // USER DELETE API URL
  deleteUserApiUrl = environment.USERDELETEAPIURL;

  // USER MODIFY API URL
  modifyUserApiUrl = environment.USERMODIFYAPIURL;

  // USERS BY EMAIL CONTAINS API URL
  usersByEmailContainsApiUrl = environment.USERSBYEMAILCONTAINSAPIURL;

  // USERS BY PROJECT NAME API URL
  usersByProjectNameApiUrl = environment.USERSPROJECTAPIURL;

  // USER BY PROJECT NAME API URL
  userByProjectNameApiUrl = environment.USERBYPROJECTNAMEAPIURL;

  // SUBJECT CHE CONTIENE LE INFORMAZIONI DELL'UTENTE
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  // SUBJECT CHE CONTIENE LA LISTA DI UTENTI
  userListSubject: BehaviorSubject<PaginatedGeneric<User>> =
    new BehaviorSubject(new PaginatedGeneric<User>());

  constructor(private http: HttpClient) {}

  //// GETTER/SETTER

  get user$() {
    return this.userSubject.asObservable();
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  get userList$() {
    return this.userListSubject.asObservable();
  }

  setUserList(userList: PaginatedGeneric<User>) {
    this.userListSubject.next(userList);
  }

  //// METODI PUBLIC

  // METODO PER OTTENERE UN UTENTE, RITORNA UN OBSERVABLE
  getUserById(id: string) {
    return this.http.get<User>(this.rootApiUrl + this.userApiUrl + '/' + id);
  }

  // METODO PER OTTENERE TUTTI GLI UTENTI, RITORNA UN OBSERVABLE
  getAllUsers(
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: string,
  ) {
    const paramString = this.paramStringMaker(
      pageNo,
      pageSize,
      sortBy,
      sortOrder,
    );

    return this.http.get<PaginatedGeneric<User>>(
      this.rootApiUrl + this.usersApiUrl + paramString,
    );
  }

  getAllUsersByProjectName(
    projectName: string,
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: string,
  ) {
    const paramString = this.paramStringMaker(
      pageNo,
      pageSize,
      sortBy,
      sortOrder,
    );
    return this.http.get<PaginatedGeneric<User>>(
      this.rootApiUrl +
        this.usersByProjectNameApiUrl +
        projectName +
        '/all' +
        paramString,
    );
  }

  getAllUsersByProjectNameAndEmailContains(
    projectName: string,
    email: string,
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: string,
  ) {
    const paramString = this.paramStringMaker(
      pageNo,
      pageSize,
      sortBy,
      sortOrder,
    );
    return this.http.get<PaginatedGeneric<User>>(
      this.rootApiUrl +
        this.userByProjectNameApiUrl +
        projectName +
        '/email/' +
        email +
        paramString,
    );
  }

  // METODO PER OTTENERE UN UTENTE, RITORNA UN OBSERVABLE
  getUsersByEmailContains(
    email: string,
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: string,
  ) {
    const paramString = this.paramStringMaker(
      pageNo,
      pageSize,
      sortBy,
      sortOrder,
    );

    return this.http.get<PaginatedGeneric<User>>(
      this.rootApiUrl + this.usersByEmailContainsApiUrl + email + paramString,
    );
  }

  // METODO PER MODIFICARE UN UTENTE, RITORNA UN OBSERVABLE(USERNAME O EMAIL)
  modifyUser(id: string, username?: string, email?: string) {
    let obj = {};

    if (username) {
      obj = { ...obj, username };
    }

    if (email) {
      obj = { ...obj, email };
    }

    return this.http.put<User>(
      this.rootApiUrl + this.modifyUserApiUrl + id,
      obj,
    );
  }

  // METODO PER ELIMINARE UN UTENTE, RITORNA UN OBSERVABLE
  deleteUser(userId: string) {
    return this.http.delete(
      this.rootApiUrl + this.deleteUserApiUrl + '/' + userId,
    );
  }

  // METODO CHE CREA I PARAMS DELLA PAGINAZIONE USERS E USERS BY EMAIL CONTAINS
  paramStringMaker(
    pageNo?: number,
    pageSize?: number,
    sortBy?: string,
    sortOrder?: string,
  ) {
    let paramString = '';

    if (pageNo) {
      console.log('pageNo: ' + pageNo);

      paramString += '?pageNo=' + pageNo;
    } else {
      paramString += '?pageNo=0';
    }

    if (pageSize) {
      paramString += '&pageSize=' + pageSize;
    } else {
      paramString += '&pageSize=10';
    }

    if (sortBy) {
      paramString += '&sortBy=' + sortBy;
    } else {
      paramString += '&sortBy=id';
    }

    if (sortOrder) {
      paramString += '&sortOrder=' + sortOrder;
    } else {
      paramString += '&sortOrder=desc';
    }

    return paramString;
  }
}

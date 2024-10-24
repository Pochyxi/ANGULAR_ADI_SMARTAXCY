import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { EmployeeService } from './employee.service';
import { JwtAuthResponseInterface } from '../models/jwt-auth-response-interface';
import { User } from '../models/User';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // URL APIs
  private rootApiUrl = environment.ROOTAPIURL;

  // LOGIN API URL
  private loginApiUrl = environment.LOGINAPIURL;

  // RECOVERY PASSWORD API URL
  private recoveryPasswordApiUrl = environment.RECOVERYPASSWORDAPIURL;

  // CHANGE PASSWORD API URL
  private changePasswordApiUrl = environment.CHANGEPASSWORDSAPIURL;

  // CHANGE PASSWORD WITH TOKEN API URL
  private changePasswordWithTokenApiUrl =
    environment.CHANGEPASSWORDWITHTOKENAPIURL;

  // VERIFY TOKEN API URL
  private verifyTokenApiUrl = environment.VERIFYTOKENAPIURL;

  // USER CREATE API URL
  private userCreateApiUrl = environment.USERCREATEAPIURL;

  // SEND VERIFICATION EMAIL API URL
  private sendVerificationEmailApiUrl = environment.SENDVERIFICATIONEMAILAPIURL;

  // SUBJECT CHE VIENE SETTATO IN CASO DI PRIMO LOGIN
  private temporaryUsernameOrEmailSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  // SUBJECT CHE VIENE SETTATO IN CASO DI PRIMO LOGIN
  private temporaryPasswordSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  // SUBJECT CHE VIENE SETTATO AL MOMENTO DEL LOGIN, SE TRUE, SETTA IL TOKEN NEL LOCAL STORAGE
  // ALTRIMENTI LO SETTA NEL SESSION
  private keepLoginSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // SUBJECT CHE DETERMINA SE L'UTENTE E' ADMIN
  private isAdminSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // SUBJECT CHE DETERMINA SE L'UTENTE E' AUTENTICATO
  private isAuthSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private user$: UserService,
    private router$: Router,
    private employee$: EmployeeService,
  ) {
    // RICHIESTA DELL'UTENTE LOGGATO
    this.getUserAndEmployeeFromStorageId();
    this.checkIsAuth();

    // IL CHECK ADMIN E' STATO EFFETTUATO DURANTE LA LOGIN NEL MOMENTO IN CUI CI ARRIVA L'OGGETTO USER
  }

  // GETTER/SETTER
  get temporaryUsernameOrEmail$() {
    return this.temporaryUsernameOrEmailSubject.asObservable();
  }

  setTemporaryUsernameOrEmail(usernameOrEmail: string) {
    this.temporaryUsernameOrEmailSubject.next(usernameOrEmail);
  }

  get temporaryPassword$() {
    return this.temporaryPasswordSubject.asObservable();
  }

  setTemporaryPassword(temporaryPassword: string) {
    this.temporaryPasswordSubject.next(temporaryPassword);
  }

  get keepLogin$() {
    return this.keepLoginSubject.asObservable();
  }

  setKeepLogin(bool: boolean) {
    this.keepLoginSubject.next(bool);
  }

  get isAdmin$() {
    return this.isAdminSubject.asObservable();
  }

  setIsAdmin(bool: boolean) {
    this.isAdminSubject.next(bool);
  }

  get isAuth() {
    return this.isAuthSubject.asObservable();
  }

  setIsAuth(bool: boolean) {
    this.isAuthSubject.next(bool);
  }

  //// METODI PUBLIC

  // METODO PER EFFETTUARE LA CHIAMATA LOGIN, RITORNA UN OBSERVABLE
  login(usernameOrEmail: string, password: string) {
    return this.http.post<JwtAuthResponseInterface>(
      this.rootApiUrl + this.loginApiUrl,
      {
        usernameOrEmail,
        password,
      },
    );
  }

  // METODO PER EFFETTUARE IL LOGOUT, PULISCE IL LOCALSTORAGE E IL SESSIONSTORAGE E RESETTA I SUBJECT
  logout() {
    const tokenPresentInLocal = !!localStorage.getItem('BearerToken');

    const tokenPresentInSession = !!sessionStorage.getItem('BearerToken');

    // PULIZIA DEL LOCALSTORAGE E DEL SESSIONSTORAGE
    this.removeTokenCondition(tokenPresentInLocal, tokenPresentInSession);

    // REIMPOSTAZIONE ISAUTH, TEMPORARIES E KEEPLOGIN, NEXT PER SETTARE IL NUOVO VALORE
    this.setKeepLogin(false);
    this.setTemporaries('', '');
    this.setIsAuth(false);
    this.setIsAdmin(false);
    this.user$.setUser(new User());
    this.employee$.setEmployee(new Employee());

    // RIMANDA ALLA PAGINA DI LOGIN, ANCHE SE DOVREBBE INTERVENIRE LA GUARD
    this.router$.navigate(['/auth/login']);
  }

  // METODO PER VERIFICARE IL TOKEN, RITORNA UN OBSERVABLE
  verifyToken(token: string, tokentype: string) {
    return this.http.get(
      this.rootApiUrl + this.verifyTokenApiUrl + token + tokentype,
    );
  }

  // METODO PER INVIARE L'EMAIL DI VERIFICA, RITORNA UN OBSERVABLE
  resendVerificationEmail(userId: number) {
    return this.http.put(
      this.rootApiUrl + this.sendVerificationEmailApiUrl + userId,
      {},
    );
  }

  // METODO PER RECUPERARE LA PASSWORD, RITORNA UN OBSERVABLE
  recoveryPassword(email: string) {
    return this.http.get(this.rootApiUrl + this.recoveryPasswordApiUrl + email);
  }

  // METODO PER CAMBIARE LA PASSWORD CON TOKEN, RITORNA UN OBSERVABLE
  changePasswordWithToken(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    return this.http.put(
      this.rootApiUrl + this.changePasswordWithTokenApiUrl + token,
      {
        newPassword,
        confirmPassword,
      },
    );
  }

  // METODO PER CAMBIARE LA PASSWORD, RITORNA UN OBSERVABLE(MODALITA' PRIMO LOGIN CON TEMPORARY PASSWORD E ISAUTH )
  changePassword(
    usernameOrEmail: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    return this.http.put(this.rootApiUrl + this.changePasswordApiUrl, {
      usernameOrEmail,
      oldPassword,
      newPassword,
      confirmPassword,
    });
  }

  // METODO PER CREARE UN UTENTE, RITORNA UN OBSERVABLE
  createUser(username: string, email: string) {
    return this.http.post(this.rootApiUrl + this.userCreateApiUrl, {
      username,
      email,
    });
  }

  // METODO CHE RICAVA LO USER ID (SETTATO IN FASE DI LOGIN) E RICAVA LE INFORMAZIONI DELL'UTENTE
  // EMETTENDOLO NEL SUBJECT USER
  getUserAndEmployeeFromStorageId() {
    const userId = localStorage.getItem('userId')
      ? localStorage.getItem('userId')
      : sessionStorage.getItem('userId');

    if (userId) {
      this.user$.getUserById(userId).subscribe({
        next: (user) => {
          this.user$.setUser(user);
          this.employee$.getEmployeeById(userId).subscribe({
            next: (employee) => {
              this.employee$.setEmployee(employee);
            },
          });
          this.checkIsAdmin(user);
        },
      });

      if (this.isAdminSubject.getValue()) {
        this.employee$.getEmployeeById(userId).subscribe({
          next: (employee) => {
            this.employee$.setEmployee(employee);
          },
        });
      }
    }
  }

  // METODO PER SETTARE LE VARIABILI TEMPORANEE NEL MOMENTO IN CUI SI ACCEDE CON TEMPORARY PASSWORD E PER REIMPOSTARLE IN CASO DI LOGOUT
  setTemporaries(usernameOrEmail: string, temporaryPassword: string) {
    this.setTemporaryUsernameOrEmail(usernameOrEmail);

    this.setTemporaryPassword(temporaryPassword);
  }

  // METODO CHE VERIFICA SE L'UTENTE E' ADMIN E SETTA IL SUBJECT ADMIN
  checkIsAdmin(user: User) {
    if (user.profileName === 'ADMIN') {
      this.setIsAdmin(true);
    } else {
      this.setIsAdmin(false);
    }
  }

  // METODO CHE VERIFICA SE L'UTENTE E' AUTENTICATO E SETTA IL SUBJECT AUTH
  checkIsAuth() {
    // SETTA ISAUTH IN BASE ALLA PRESENZA DEL TOKEN
    if (
      localStorage.getItem('BearerToken') ||
      sessionStorage.getItem('BearerToken')
    ) {
      this.setIsAuth(true);
    } else {
      this.setIsAuth(false);
    }
  }

  // METODI PRIVATE

  // METODO PRIVATO CHE RIMUOVE IL TOKEN NEL LOCALSTORAGE O NEL SESSIONSTORAGE
  private removeTokenCondition(
    conditionLocal: boolean,
    conditionSession: boolean,
  ) {
    if (conditionLocal) {
      localStorage.removeItem('BearerToken');
      localStorage.removeItem('userId');
    }

    if (conditionSession) {
      sessionStorage.removeItem('BearerToken');
      sessionStorage.removeItem('userId');
    }
  }
}

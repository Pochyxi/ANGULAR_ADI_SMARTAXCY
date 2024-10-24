import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../../material/material.module";
import {AnimateParticlesComponent} from "../../../animations/animate-particles/animate-particles.component";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../models/User";
import {ResponsiveObject} from "../../../models/ResponsiveObject";
import {AxcySetup} from "../../../models/AxcySetup";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {SnackbarService} from "../../../services/snackbar.service";
import {AxcyService} from "../../../services/axcy.service";
import {JwtAuthResponseInterface} from "../../../models/jwt-auth-response-interface";
import {ResponsiveService} from "../../../services/responsive.service";
import {AxcyComponent} from "../../axcy/axcy.component";
import {TooltipDirective} from "../../../directives/tooltip.directive";
import {ResponsiveCardComponent} from "../../../components-template/responsive-card/responsive-card.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, AnimateParticlesComponent, AxcyComponent, ReactiveFormsModule, RouterLink, TooltipDirective, ResponsiveCardComponent, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{
  // SUBJECT PER LA GESTIONE DELLA UNSUBSCRIBE
  private onDestroy$ = new Subject<void>();

  info = 'Inserisci le tue credenziali per accedere';

  // FORM DI LOGIN
  loginForm: FormGroup;
  usernameOrEmail = '';
  password = '';
  keepLogin = false;

  showPassword = false;

  // FLAG PER LA GESTIONE DEL CARICAMENTO SUL BOTTONE DI LOGIN
  loadingFlag = false;

  // FLAG PER LA GESTIONE DELLE VALIDAZIONI
  validationsFlag = false;

  // UTENTE CHE HA EFFETTUATO IL LOGIN
  user: User = new User();

  // RESPONSIVE OBJ
  res = new ResponsiveObject();

  axcyEmotion = '';
  axcyInterval: any;
  axcySetup = new AxcySetup({
    position: 'absolute',
    width: '150px',
  });
  isWriting = false;
  spawnIf = '';

  constructor(
    private auth$: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private user$: UserService,
    private snack$: SnackbarService,
    private responsive$: ResponsiveService,
    private axcy$: AxcyService,
    public translate$: TranslateService,
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: [''],
      password: [''],
      keepLogin: false,
    });
  }

  ngOnInit(): void {
    // AXCY
    this.axcy$.randomEmotionWatching(this.isWriting, this.usernameOrEmail);
    this.axcyInterval = setInterval(() => {
      this.axcy$.randomEmotionWatching(this.isWriting, this.usernameOrEmail);
    }, 2500);

    this.axcy$.axcyEmotion$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.axcyEmotion = data;
      });

    this.axcy$.isWriting$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.isWriting = data;
    });

    this.axcy$.axcySetups$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.axcySetup = data;
      });

    this.axcy$.spawnIf$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.spawnIf = data;
    });

    // SOTTOSCRIZIONE RESPONSIVE
    this.responsive$.resObj$.subscribe({
      next: (res) => {
        this.res = res;
      },
    });

    // RECUPERO DATI DALL'AUTH SERVICE
    this.user$.user$.pipe(takeUntil(this.onDestroy$)).subscribe((user) => {
      this.user = user;
    });

    // RECUPERO IL KEEP LOGIN DALL'AUTH SERVICE
    this.auth$.keepLogin$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.keepLogin = data;
    });

    // OBSERVABLE SUL FORM DI LOGIN
    this.onFormFieldChange(this.loginForm, 'usernameOrEmail', (value) => {
      this.usernameOrEmail = value;
      this.axcy$.writingAxcy(value);
    });

    this.onFormFieldChange(this.loginForm, 'password', (value) => {
      this.password = value;
      this.axcy$.writingAxcy(value);
    });

    this.onFormFieldChange(this.loginForm, 'keepLogin', (value) => {
      this.keepLogin = value;
    });
  }

  activateAxcyWriting() {
    this.axcy$.setWriting(true);
  }

  deactivateAxcyWriting() {
    this.axcy$.setWriting(false);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();

    clearInterval(this.axcyInterval);
  }

  // FUNZIONE DI LOGIN
  login(): void {
    if (this.loadingFlag) return;

    if (this.loginForm.invalid) {
      this.snack$.showCustomSnackbar('Compila tutti i campi');
      return;
    }

    // INIZIA IL CARICAMENTO
    this.loadingFlag = true;

    // CHIAMATA AL SERVIZIO DI LOGIN
    this.auth$.login(this.usernameOrEmail, this.password).subscribe({
      next: (data: JwtAuthResponseInterface) => {
        console.log(data);

        if (data.user.temporaryPassword) {
          this.auth$.setTemporaries(this.usernameOrEmail, this.password);
        }

        // SE KEEP LOGIN È TRUE SALVO I DATI NEL LOCAL STORAGE
        if (this.keepLogin) {
          localStorage.setItem('BearerToken', data.accessToken);
          localStorage.setItem('userId', JSON.stringify(data.user.id));
          // ALTRIMENTI SALVO I DATI NEL SESSION STORAGE
        } else {
          sessionStorage.setItem('BearerToken', data.accessToken);
          sessionStorage.setItem('userId', JSON.stringify(data.user.id));
        }

        this.user$.setUser(data.user);
        this.auth$.setIsAuth(true);
        this.auth$.checkIsAdmin(data.user);

        if (data.user.temporaryPassword) {
          this.router.navigate(['/auth/change-password']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.log(error);

        // FERMO IL CARICAMENTO
        this.loadingFlag = false;
      },
      complete: () => {
        this.loadingFlag = false;
      },
    });
  }

  // FUNZIONE PER LA GESTIONE DEI VALORI DEI CAMPI NEL FORM
  onFormFieldChange(
    form: FormGroup,
    fieldName: string,
    callback: (value: any) => void,
  ): void {
    const field = form.get(fieldName);

    if (!field) {
      console.warn(`Campo '${fieldName}' non trovato nel form.`);
      return;
    }

    field.valueChanges.subscribe((value) => {
      callback(value);
    });
  }

  loginButtonMouseOver() {
    this.validationsFlag = true;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}

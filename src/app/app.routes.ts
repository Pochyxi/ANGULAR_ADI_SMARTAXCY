import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/authentication/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'recovery-password',
        loadComponent: () =>
          import(
            './components/auth/recovery-password/recovery-password.component'
          ).then((m) => m.RecoveryPasswordComponent),
      },
    ],
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule,
  //     ),
  // },
  // {
  //   path: 'user',
  //   loadChildren: () =>
  //     import('./modules/user/user.module').then((m) => m.UserModule),
  // },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./modules/admin/admin.module').then((m) => m.AdminModule),
  // },
];

import {importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([])
    ),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule
    ),
  ],
};

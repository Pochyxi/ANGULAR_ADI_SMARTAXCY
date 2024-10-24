import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../material/snackbar/snackbar.component';
import { AxcySetup } from '../models/AxcySetup';
import { AxcyService } from './axcy.service';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private snackbar$: MatSnackBar,
    private axcy$: AxcyService,
  ) {}

  // METODO PER MOSTRARE UNA SNACKBAR PERSONALIZZATA, CON MESSAGGIO, AZIONE, DURATA E CLASSE(smartAxcent.scss)
  showCustomSnackbar(
    message: string,
    action?: string,
    duration = 3000,
    panelClass = 'alert',
    axcyEmotion?: string,
  ) {
    let snackClass = '';

    switch (panelClass) {
      case 'alert':
        snackClass = 'smart-snackbar-alert';
        break;
      case 'success':
        snackClass = 'smart-snackbar-success';
        break;
      default:
        snackClass = 'smart-snackbar-alert';
        break;
    }
    this.snackbar$.openFromComponent(SnackbarComponent, {
      data: { message: message, action: action, panelClass: snackClass },
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: duration,
      panelClass: [snackClass],
    });

    if (axcyEmotion) {
      this.axcy$.setAxcyEmotion(
        './assets/icons/axcy_house/' + axcyEmotion + '.svg',
      );
    } else {
      if (snackClass === 'smart-snackbar-alert') {
        this.axcy$.setAxcyEmotion('./assets/icons/axcy_house/AXCY_ANGRY.svg');
      } else {
        this.axcy$.setAxcyEmotion('./assets/icons/axcy_house/AXCY_HAPPY.svg');
      }
    }

    this.axcy$.setAxcySetups(
      new AxcySetup({
        position: 'relative',
        width: '70px',
      }),
    );
    this.axcy$.setSpawnIf('snack');
    this.axcy$.waitingForSpawn(5000);
  }
}

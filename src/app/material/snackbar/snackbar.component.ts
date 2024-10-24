import { Component, Inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AxcySetup } from '../../models/AxcySetup';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { AxcyService } from '../../services/axcy.service';
import { MaterialModule } from '../material.module';
import { AxcyComponent } from '../../components/axcy/axcy.component';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MaterialModule, AxcyComponent],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  // SUBJECT PER LA GESTIONE DELLA UNSUBSCRIBE
  private onDestroy$ = new Subject<void>();

  // VARIABILE PER LA VISUALIZZAZIONE CONDIZIONALE DEL COLORE TESTO
  textColor = '';

  axcyEmotion = '';
  axcySetup = new AxcySetup({ position: 'relative', width: '150px' });
  spawnIf = '';

  constructor(
    public sbRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private axcy$: AxcyService,
  ) {
    if (data.panelClass === 'smart-snackbar-success') {
      this.textColor = 'text-center smart-text-success';
    } else if (data.panelClass === 'smart-snackbar-alert') {
      this.textColor = 'text-center smart-text-success';
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    // AXCY
    this.axcy$.axcyEmotion$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.axcyEmotion = data;
      });

    this.axcy$.axcySetups$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.axcySetup = data;
      });

    this.axcy$.spawnIf$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.spawnIf = data;
    });
  }

  perfAction() {
    this.sbRef.dismiss();
  }
}

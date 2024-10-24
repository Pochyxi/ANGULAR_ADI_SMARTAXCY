import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AxcySetup } from '../../models/AxcySetup';
import { AxcyService } from '../../services/axcy.service';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-axcy',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './axcy.component.html',
  styleUrl: './axcy.component.scss',
})
export class AxcyComponent implements OnInit, OnDestroy {
  // SUBJECT PER LA GESTIONE DELLA UNSUBSCRIBE
  private onDestroy$ = new Subject<void>();

  axcyEmotion = '';
  axcySetup = new AxcySetup({ position: 'absolute', width: '150px' });
  spawnIf = '';

  @Input() spawnPlace = '';
  @Input() classes: string[] = [];

  constructor(private axcyEmotionService: AxcyService) {}

  ngOnInit(): void {
    this.axcyEmotionService.axcySetups$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (axcySetup) => {
          this.axcySetup = axcySetup;
        },
      });

    this.axcyEmotionService.axcyEmotion$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (axcyEmotion: string) => {
          this.axcyEmotion = axcyEmotion;
        },
      });

    this.axcyEmotionService.spawnIf$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (spawnIf: string) => {
          this.spawnIf = spawnIf;
        },
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // METODO PER LA GESTIONE DELLE CLASSI CSS
  getClasses(): string {
    return this.classes.join(' ');
  }
}

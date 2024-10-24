import { Injectable } from '@angular/core';
import {Emotion} from "../models/Emotion";
import {AxcySetup} from "../models/AxcySetup";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AxcyService {

  private axcyEmotionSubject = new BehaviorSubject<string>(
    './assets/icons/axcy_house/AXCY_WATCHER_BOTTOM.svg',
  );
  private isWritingSubject = new BehaviorSubject<boolean>(false);
  private axcySetupsSubject = new BehaviorSubject<AxcySetup>(
    new AxcySetup({ position: 'absolute', width: '150px' }),
  );
  private spawnIfSubject = new BehaviorSubject<string>('');
  private waitFlag = new BehaviorSubject<boolean>(false);

  constructor() {}

  get axcyEmotion$() {
    return this.axcyEmotionSubject.asObservable();
  }

  setAxcyEmotion(emotion: string) {
    this.axcyEmotionSubject.next(emotion);
  }

  get isWriting$() {
    return this.isWritingSubject.asObservable();
  }

  setWriting(isWriting: boolean) {
    this.isWritingSubject.next(isWriting);
  }

  get axcySetups$() {
    return this.axcySetupsSubject.asObservable();
  }

  setAxcySetups(axcySetup: AxcySetup) {
    this.axcySetupsSubject.next(axcySetup);
  }

  // Stringa che determina dove spawnare axcy
  // Il componente axcy-emotion si sottoscrive a questo observable
  // il componente accetta uno spawnPlace e se è uguale a quello che ha ricevuto, si spawnera
  get spawnIf$() {
    return this.spawnIfSubject.asObservable();
  }

  // Setta la stringa che determina dove spawnare axcy
  setSpawnIf(spawnIf: string) {
    this.spawnIfSubject.next(spawnIf);
  }

  // Flag per gestire l'attesa fra un'azione e l'altra
  get waitFlag$() {
    return this.waitFlag.asObservable();
  }

  // Setta il flag per gestire l'attesa fra un'azione e l'altra
  private setWaitFlag(waitFlag: boolean) {
    this.waitFlag.next(waitFlag);
  }

  // Genera un'attesa per lo spawn di axcy
  waitingForSpawn(millis: number) {
    this.setWaitFlag(true);
    setTimeout(() => {
      this.setWaitFlag(false);
    }, millis);
  }

  // AXCY, animazione random durante la scrittura, presente in login
  randomEmotionWatching(bool: boolean, strValue: string) {
    // Se c'è un'attesa, non fare nulla
    if (this.waitFlag.value) return;

    // Se è in scrittura, genera l'animazione di scrittura
    if (bool) {
      this.writingAxcy(strValue);
      return;
    }

    // ogni numero rappresenta un'animazione
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    switch (numbers[0]) {
      case 1:
        this.emotionSwitcher(Emotion.WatcherBottom);
        break;
      case 2:
        this.emotionSwitcher(Emotion.WatcherLeft);
        break;

      case 3:
        this.emotionSwitcher(Emotion.WatcherRight);
        break;
      case 4:
        this.emotionSwitcher(Emotion.WatcherTop);
        break;
      case 5:
        this.emotionSwitcher(Emotion.WatcherBottomLeft);
        break;
      case 6:
        this.emotionSwitcher(Emotion.WatcherBottomRight);
        break;
      case 7:
        this.emotionSwitcher(Emotion.WatcherTopLeft);
        break;
      case 8:
        this.emotionSwitcher(Emotion.WatcherTopRight);
        break;

      default:
        break;
    }

    // Setta la posizione di axcy
    this.setAxcySetups(
      new AxcySetup({
        position: 'absolute',
        width: '155px',
        top: '320px',
        left: '50%',
        transform: 'translateX(-50%)',
      }),
    );

    // Setta il luogo dove spawnare axcy
    this.setSpawnIf('login');
  }

  // Animazione presente nella login
  writingAxcy(strValue: string) {
    // Se c'è un'attesa, non fare nulla
    if (this.waitFlag.value) return;

    this.setWriting(true);

    if (strValue.length === 0) {
      this.emotionSwitcher(Emotion.WritingReady);
    }

    if (strValue.length % 2 === 0) {
      this.emotionSwitcher(Emotion.Writing1);
    } else {
      this.emotionSwitcher(Emotion.Writing2);
    }

    // Setta la posizione di axcy
    this.setAxcySetups(
      new AxcySetup({
        position: 'absolute',
        width: '155px',
        top: '320px',
        left: '50%',
        transform: 'translateX(-50%)',
      }),
    );

    // Setta il luogo dove spawnare axcy
    this.setSpawnIf('login');
  }

  emotionSwitcher(emotion: Emotion) {
    const basePath = './assets/icons/axcy_house/';

    switch (emotion) {
      case Emotion.Angry:
        this.setAxcyEmotion(basePath + 'AXCY_ANGRY.svg');
        break;
      case Emotion.Base:
        this.setAxcyEmotion(basePath + 'AXCY_BASE.svg');
        break;

      case Emotion.Happy:
        this.setAxcyEmotion(basePath + 'AXCY_HAPPY.svg');
        break;

      case Emotion.Sad:
        this.setAxcyEmotion(basePath + 'AXCY_SAD.svg');
        break;

      case Emotion.Thinker:
        this.setAxcyEmotion(basePath + 'AXCY_THINKER.svg');
        break;

      case Emotion.WatcherBottom:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_BOTTOM.svg');
        break;

      case Emotion.WatcherLeft:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_LEFT.svg');
        break;

      case Emotion.WatcherRight:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_RIGHT.svg');
        break;

      case Emotion.WatcherTop:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_TOP.svg');
        break;

      case Emotion.WatcherBottomLeft:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_BOTTOM_LEFT.svg');
        break;

      case Emotion.WatcherBottomRight:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_BOTTOM_RIGHT.svg');
        break;

      case Emotion.WatcherTopLeft:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_TOP_LEFT.svg');
        break;

      case Emotion.WatcherTopRight:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_TOP_RIGHT.svg');
        break;

      case Emotion.Writing1:
        this.setAxcyEmotion(basePath + 'AXCY_WRITING_1.svg');
        break;

      case Emotion.Writing2:
        this.setAxcyEmotion(basePath + 'AXCY_WRITING_2.svg');
        break;

      case Emotion.WritingReady:
        this.setAxcyEmotion(basePath + 'AXCY_WRITING_READY.svg');
        break;

      default:
        this.setAxcyEmotion(basePath + 'AXCY_WATCHER_BOTTOM.svg');
        break;
    }
  }
}

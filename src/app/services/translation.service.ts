import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DEFAULT_LANG, Language, SUPPORTED_LANGUAGES} from "../models/languages";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLangSubject = new BehaviorSubject<string>(DEFAULT_LANG);
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translate: TranslateService) {}

  init(): void {
    // Imposta le lingue supportate
    this.translate.addLangs(SUPPORTED_LANGUAGES.map(lang => lang.code));
    this.translate.setDefaultLang(DEFAULT_LANG);

    // Recupera la lingua salvata o usa quella del browser
    const savedLang = localStorage.getItem('selectedLang');
    const browserLang = this.translate.getBrowserLang();
    const langToUse = savedLang ||
      (SUPPORTED_LANGUAGES.map(l => l.code).includes(browserLang || '') ? browserLang : DEFAULT_LANG);

    this.changeLang(langToUse || DEFAULT_LANG);
  }

  changeLang(lang: string): void {
    if (this.translate.getLangs().includes(lang)) {
      this.translate.use(lang);
      this.currentLangSubject.next(lang);
      localStorage.setItem('selectedLang', lang);
      this.updateDocumentLang(lang);
    }
  }

  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }

  getSupportedLanguages(): Language[] {
    return SUPPORTED_LANGUAGES;
  }

  private updateDocumentLang(lang: string): void {
    document.documentElement.lang = lang;
  }

  // Metodi helper per la traduzione
  i18translate(key: string, params?: object): Observable<string> {
    return this.translate.stream(key, params);
  }

  instant(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}

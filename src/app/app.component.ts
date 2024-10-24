import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {TranslationService} from "./services/translation.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor(private translate: TranslateService, private translation: TranslationService) {
    this.translate.setDefaultLang('en');

    this.translation.currentLang$.subscribe((lang) => {
      this.translate.use(lang);
    } );
  }
}

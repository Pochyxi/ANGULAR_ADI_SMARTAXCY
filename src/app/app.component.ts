import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'smartaxcy';

  constructor(private translate: TranslateService) {
    // Imposta la lingua predefinita su inglese (o qualsiasi altra lingua)
    this.translate.setDefaultLang('en');

    // Imposta la lingua attiva su italiano
    this.translate.use('it');
  }
}

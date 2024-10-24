import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-responsive-card',
  standalone: true,
  imports: [],
  templateUrl: './responsive-card.component.html',
  styleUrl: './responsive-card.component.scss',
})
export class ResponsiveCardComponent {
  @Input() isMobile: boolean = false;
  @Input() isTablet: boolean = false;
  @Input() isDesktop: boolean = false;
  @Input() isDesktopLarge: boolean = false;
  @Input() isDesktopExtraLarge: boolean = false;
}

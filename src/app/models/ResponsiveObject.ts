export class ResponsiveObject {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isDesktopLarge: boolean;
  isDesktopExtraLarge: boolean;

  constructor() {
    this.isMobile = false;
    this.isTablet = false;
    this.isDesktop = false;
    this.isDesktopLarge = false;
    this.isDesktopExtraLarge = false;
  }
}

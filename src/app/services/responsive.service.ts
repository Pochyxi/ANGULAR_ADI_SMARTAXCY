import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponsiveObj } from '../models/ResponsiveObj';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  // MOBILE
  private isMobile = new BehaviorSubject<boolean>(window.innerWidth < 768);

  // TABLET
  private isTablet = new BehaviorSubject<boolean>(
    window.innerWidth < 1024 && window.innerWidth > 768,
  );

  // LAPTOP
  private isDesktop = new BehaviorSubject<boolean>(
    window.innerWidth < 1440 && window.innerWidth > 1024,
  );

  // DESKTOP LARGE
  private isDesktopLarge = new BehaviorSubject<boolean>(
    window.innerWidth < 1920 && window.innerWidth > 1440,
  );

  // DESKTOP EXTRA LARGE
  private isDesktopExtraLarge = new BehaviorSubject<boolean>(
    window.innerWidth >= 1920,
  );

  private resObj = new BehaviorSubject<ResponsiveObj>({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth < 1024 && window.innerWidth > 768,
    isDesktop: window.innerWidth < 1440 && window.innerWidth > 1024,
    isDesktopLarge: window.innerWidth < 1920 && window.innerWidth > 1440,
    isDesktopExtraLarge: window.innerWidth > 1919,
  });

  constructor() {
    window.onresize = () => {
      this.isMobile.next(window.innerWidth < 768);
      this.isTablet.next(window.innerWidth < 1024 && window.innerWidth > 768);
      this.isDesktop.next(window.innerWidth < 1440 && window.innerWidth > 1024);
      this.isDesktopLarge.next(
        window.innerWidth < 1920 && window.innerWidth > 1440,
      );
      this.isDesktopExtraLarge.next(window.innerWidth > 1920);

      this.resObj.next({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth < 1024 && window.innerWidth > 768,
        isDesktop: window.innerWidth < 1440 && window.innerWidth > 1024,
        isDesktopLarge: window.innerWidth < 1920 && window.innerWidth > 1440,
        isDesktopExtraLarge: window.innerWidth > 1920,
      });
    };
  }

  get isMobile$() {
    return this.isMobile.asObservable();
  }

  get isTablet$() {
    return this.isTablet.asObservable();
  }

  get isDesktop$() {
    return this.isDesktop.asObservable();
  }

  get isDesktopLarge$() {
    return this.isDesktopLarge.asObservable();
  }

  get isDesktopExtraLarge$() {
    return this.isDesktopExtraLarge.asObservable();
  }

  get resObj$() {
    return this.resObj.asObservable();
  }
}

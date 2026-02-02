import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Injproducts {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: any): void {
    if (!this.isBrowser()) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  getItem<T>(key: string): T | null {
    if (!this.isBrowser()) return null;

    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading from local storage', error);
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}

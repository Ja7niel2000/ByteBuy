import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private color = '#7843e6';

  getColor() {
    return this.color;
  }

  setColor(newColor: string) {
    this.color = newColor;
    document.documentElement.style.setProperty('--main-color', newColor);
  }
}
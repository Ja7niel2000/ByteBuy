import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './modules/layout/component/footer/footer.component';
import { NavbarComponent } from './modules/layout/component/navbar/navbar.component';

//Decorador
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ByteBuy';
  constructor(private renderer: Renderer2) {}

  updateMainColor(newColor: string) {
    this.renderer.setStyle(document.documentElement, '--main-color', newColor);
  }
}

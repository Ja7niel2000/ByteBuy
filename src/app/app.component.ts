import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './modules/layout/component/footer/footer.component';
import { NavbarComponent } from './modules/layout/component/navbar/navbar.component';
import { ThemeSelectorComponent } from './modules/layout/component/theme-selector/theme-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, ThemeSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ByteBuy';
}

import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '../../../../shared/shared_module';

@Component({
  selector: 'app-compra-exitosa',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './compra-exitosa.component.html',
  styleUrl: './compra-exitosa.component.css'
})
export class CompraExitosaComponent {
  faCircleCheck=faCircleCheck;

}

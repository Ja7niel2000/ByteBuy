import { Component } from '@angular/core';
import { faTwitter,  faFacebookF, faInstagramSquare,faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGem } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '../../../../shared/shared_module';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faTwitter=faTwitter;  
  faFacebookF=faFacebookF;
  faInstagramSquare=faInstagramSquare;
  faLinkedin=faLinkedin;
  faGithub=faGithub;
  faGem=faGem;


}

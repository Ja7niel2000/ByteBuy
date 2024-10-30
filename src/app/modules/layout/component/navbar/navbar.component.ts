import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppNavItemComponent } from "./nav-item/nav-item.component";
import { SharedModule } from '../../../../shared/shared_module';
import { SecuredComponent } from '../../../auth/component/secured/secured.component';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { SwalMessages } from '../../../../shared/swal-messages';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, AppNavItemComponent,SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  swal:SwalMessages = new SwalMessages();

  logged:Boolean=false;
  admin:Boolean=false;
  
  constructor(private router:Router,private auth:AuthenticationService){}
  
  ngOnInit():void{
    this.logged=this.auth.isUserLoggedIn();
    this.admin=this.auth.isAdmin();

  }

  redirect(url:String[]){
    this.router.navigate(url);
  }

  logOut(){
    this.auth.logOut();
    this.router.navigate(['home']);
    this.swal.successMessage('Session cerrada exitosamente');
  }

}

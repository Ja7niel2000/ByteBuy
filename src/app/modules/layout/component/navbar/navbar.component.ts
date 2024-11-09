import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared_module';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Category } from '../../../product/_model/category';
import { CategoryService } from '../../../product/_service/category.service';
import { faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons';
import { ColorService } from '../../_service/change-theme.service';
//Decorador
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  swal:SwalMessages = new SwalMessages();
  categories:Category[]=[];
  faCartShopping=faCartShopping;
  faBars=faBars;
  mainColor:string='#7843e6';

  constructor(
    private router:Router, 
    public auth:AuthenticationService, 
    private categoryService: CategoryService,
    private chngTheme:ColorService){}
    
  ngOnInit():void{
    this.auth.isUserLoggedIn();
    this.getCategories();

  }

  getCategories(){
    this.categoryService.getActivateCategories().subscribe({
      next:(v)=>{
        this.categories=v;

      },error:(e)=>{
        this.swal.errorMessage('error '+e?.error?.message);

      }
    })
  }



  logOut(){
    this.auth.logOut();
    this.router.navigate(['']);
    this.swal.successMessage('Session cerrada exitosamente');
  }

  updateMainColor() {
    if(this.chngTheme.getColor()=='#7843e6') this.chngTheme.setColor('#000');
    else this.chngTheme.setColor('#7843e6');   
  }

}

import { Component,inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppNavItemComponent } from "./nav-item/nav-item.component";
import { SharedModule } from '../../../../shared/shared_module';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Category } from '../../../product/_model/category';
import { CategoryService } from '../../../product/_service/category.service';
import { faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons';
//Decorador
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule,RouterModule, AppNavItemComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  swal:SwalMessages = new SwalMessages();
  categories:Category[]=[];
  faCartShopping=faCartShopping;
  faBars=faBars;

  constructor(private router:Router, public auth:AuthenticationService, private categoryService: CategoryService){}
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
    this.router.navigate(['home']);
    this.swal.successMessage('Session cerrada exitosamente');
  }

}

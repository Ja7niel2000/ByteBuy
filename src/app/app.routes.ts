import { Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/component/category/category.component';
import { MainComponent } from './modules/layout/component/main/main.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { Product } from './modules/product/_model/product';
import { ProductImage } from './modules/product/_model/product-image';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { HomeComponent } from './modules/home/component/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path:'home',
        component: HomeComponent

    },
    {
        path: 'categoria',
        component: CategoryComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    },{
        path: 'product',
        component: ProductComponent, 
    },{
        path: 'product/:gtin',
        component: ProductImageComponent, 
    }

];

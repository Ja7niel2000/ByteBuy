import { Routes } from '@angular/router';
import {ProductInfoComponent} from './modules/home/component/product-info/product-info.component';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { HomeComponent } from './modules/home/component/home/home.component';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';
import { SortcategoriesComponent } from './modules/home/component/sortcategories/sortcategories.component';
import { CarritoComponent } from './modules/invoice/component/carrito/carrito.component';
import { InvoiceDetailComponent } from './modules/invoice/component/invoice-detail/invoice-detail.component';
import { CompraExitosaComponent } from './modules/invoice/component/compra-exitosa/compra-exitosa.component';

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
        path:'categoria/:category_id',
        component:SortcategoriesComponent
    },
    {
        path:'producto/:gtin',
        component: ProductInfoComponent

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
        path:'facturas',
        component:InvoiceComponent,
        canActivate:[authenticationGuard]

    },
    {
        path:'facturas/:id',
        component:InvoiceDetailComponent,
        canActivate:[authenticationGuard]
    },
    {
        path:'cart',
        component:CarritoComponent,
        canActivate:[authenticationGuard]
    },
    {
        path:'compraExitosa',
        component:CompraExitosaComponent,
        canActivate:[authenticationGuard]

    },
    {
        path: 'categoria',
        component: CategoryComponent,
        canActivate: [authenticationGuard]
    },
    
    {
        path: 'secured',
        component: SecuredComponent, 
        canActivate: [authenticationGuard]
    },{
        path: 'product',
        component: ProductComponent,
        canActivate:[authenticationGuard]
    },{
        path: 'product/:gtin',
        component: ProductImageComponent, 
        canActivate:[authenticationGuard]
    }

];

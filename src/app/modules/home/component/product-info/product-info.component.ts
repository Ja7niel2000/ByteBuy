import { Component, OnInit } from '@angular/core';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../product/_service/product.service';
import { Product } from '../../../product/_model/product';
import { ProductImage } from '../../../product/_model/product-image';
import { SwalMessages } from '../../../../shared/swal-messages';
import { CartService } from '../../../invoice/_service/cart.service';
import { Cart } from '../../../invoice/_model/cart';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared_module';
import { AuthenticationService } from '../../../auth/_service/authentication.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})

export class ProductInfoComponent implements OnInit {
  gtin:string='';
  product:Product=new Product;
  images:Array<ProductImage>=[];
  swal:SwalMessages=new SwalMessages;
  cart:Cart =new Cart;
  form:FormGroup =new FormGroup({
    cantidad:new FormControl(1)
  });

  constructor(
    private productImgService:ProductImageService, 
    private productService:ProductService,
    private route: ActivatedRoute,
    private cartService:CartService,
    private router:Router,
    private auth:AuthenticationService
  ){
  }

  public ngOnInit(){
  this.gtin=String(this.route.snapshot.paramMap.get('gtin'));
    if(this.gtin){
      this.getProduct()
    }
  }

  private getProduct():void{
    this.productService.getProduct(this.gtin).subscribe({
      next:(v)=>this.product=v,
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>this.getProductImage()
    });
  }

  private getProductImage():void{
    this.productImgService.getProductImage(this.product.product_id).subscribe({
      next:(v)=>this.images=v,
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>this.isLogged(()=>this.getCart())
    });
  }

  private isLogged(call:()=> void, redirectToLogin:boolean=false):void{

    if(this.auth.isLoggedIn && !this.auth.isAdmin)
       return call();
    
    if(redirectToLogin){
      if(this.auth.isAdmin)return this.swal.errorMessage('Los administradores no pueden tener carrito');
      this.swal.errorMessage('Inicia sessión para poder hacer esto');
      this.router.navigateByUrl('/login');
    }
  }
  
  protected addToCartButton():void{
    this.isLogged(()=>this.addToCart(),true);
  }

  private getCart():void{
      this.cartService.getCart().subscribe({
        next:(v)=>{
          if(v.length!=0){
            for(let item of v){
              if(item.gtin==this.product.gtin){
                this.product.stock-=item.quantity;
              }
            }
          }
        },
        error:(e)=>this.swal.errorMessage(e.error?.message) 
      });
  }

  private addToCart():any{
    if((this.product.stock-Number(this.form.controls['cantidad'].value)<0))
      return this.swal.errorMessage('La cantidad es incorrenta');
  
    this.cart.gtin=this.product.gtin;
    this.cart.quantity=Number(this.form.controls['cantidad'].value);
    this.product.stock-=Number(this.form.controls['cantidad'].value);
    
    this.cartService.addToCart(this.cart).subscribe({
      next:(v)=>this.swal.successMessage("Producto agregado al carrito"),
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>this.form.controls['cantidad'].setValue(1)
    });
    
  }




}

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



@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements OnInit {
  gtin:any;
  product:Product|any;
  images:Array<ProductImage>=[];
  swal:SwalMessages=new SwalMessages;
  cart:Cart =new Cart;
  form:FormGroup =new FormGroup({
    cantidad:new FormControl(1)
  });
  cantidad:number=2;
  

  constructor(
    private productImgService:ProductImageService, 
    private productService:ProductService,
    private route: ActivatedRoute,
    private cartService:CartService,
    private router:Router
  ){
  }

  ngOnInit(){

    this.gtin=this.route.snapshot.paramMap.get('gtin');
    if(this.gtin){
      this.productService.getProduct(this.gtin).subscribe({
        next:(v1)=>{
          
          this.product=v1;

          this.productImgService.getProductImage(this.product.product_id).subscribe({
            next:(v2)=>{
              this.images=v2
              this.cartService.getCart().subscribe({
                next:(v)=>{
                  if(v.length!=0){
                    for(let item of v)
                      if(item.gtin==this.product.gtin)this.product.stock-=item.quantity;
                  }

                },error:(e)=>{
                  if(e?.error?.message!='FORBIDDEN')this.swal.errorMessage(e?.error?.message)
                  }
                
              })

            },
            error:(e)=>this.swal.errorMessage(e?.error?.message)
          });
        },error:(e)=>this.swal.errorMessage(e?.error?.message)
        
      });
    }
   
  }

  addToCart(){

    this.cart.gtin=this.product.gtin;
    this.cart.quantity=Number(this.form.controls['cantidad'].value);
    this.product.stock-=Number(this.form.controls['cantidad'].value);
    

    this.cartService.addToCart(this.cart).subscribe({
      next:(v)=>this.swal.successMessage("Producto agregado al carrito"),
      error:(e)=>{
        if(e.error.message=='La cantidad es inválida')this.swal.errorMessage("Stock Insuficiente");
        else if (e.error.message=='FORBIDDEN'){
          this.swal.errorMessage('Inicia sessión para poder hacer esto');
          this.router.navigateByUrl('/login');
          
        }

        else this.swal.errorMessage(e.error.message);
      }
    });
    
  }




}

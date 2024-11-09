import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../product/_service/product.service';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../shared/shared_module';
import { CategoryService } from '../../../product/_service/category.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Category } from '../../../product/_model/category';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../invoice/_service/cart.service';
import { AuthenticationService } from '../../../auth/_service/authentication.service';
import { ProductImage } from '../../../product/_model/product-image';

@Component({
  selector: 'app-sortcategories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sortcategories.component.html',
  styleUrl: './sortcategories.component.css'
})
export class SortcategoriesComponent implements OnInit {
  products:Array<any>=[];
  cart:Array<any>=[];
  category:Category=new Category;
  category_id:number=this.category.category_id;
  sortedProductImgs:Array<ProductImage>=[];
  placeholder:ProductImage = new ProductImage;
  swal:SwalMessages=new SwalMessages;
  faCartShopping=faCartShopping;

  constructor( 
    private route: ActivatedRoute, 
    private pService:ProductService,
    private productImageService:ProductImageService,
    private categoryService:CategoryService,
    private cartService:CartService,
    protected auth:AuthenticationService,
  ){}

  ngOnInit():void{
    //Esto es para detectar cambios en la ruta
    this.route.paramMap.subscribe(params=>{
      //Agrega el parametro de ruta a la variable category_id 
      this.category_id=Number(params.get('category_id'));
      this.products=[];

      //Si category_id es 0 se ejecutan las funciones para mostrar todos los productos
      if(this.category_id==0){
        this.category.category='Mostrando Todos los Productos';
        
        //se ejecuta la función para saber si se obtiene el carrito o no y
        //se manda la función loadAllProducts callback
        this.getCartIfLogged(()=>this.loadAllProducts());
      }
      //
      else{
        this.sortedProductImgs=[];
        this.category.category='';
        this.getCategory();
      }
      });
  }

  private getCategory():void{
    //Obtiene La categoria y al terminal la ejecución se manda a llamar la función getCartIfLogged
    //con callback loadProductsByCategory
    this.categoryService.getCategory(this.category_id).subscribe({
      next:(v)=>this.category=v,
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>this.getCartIfLogged(()=>this.loadProductsByCategory())
    });
  }

  //Obtiene el carrito si el usuario está logeado y no es admin.
  private getCartIfLogged(fun:()=>void):void{
    if(this.auth.isLoggedIn && !this.auth.isAdmin)
      this.getCart(fun);
    else{
      this.cart=[]
      fun();
    }
  }

  private getCart(fun:()=>void):void{
    //Se obtiene el carrito y se ejecuta el callback.
    this.cartService.getCart().subscribe({
      next:v=>this.cart=v,
      error:e=>{this.swal.errorMessage(e?.error?.message)},
      complete:()=>fun()
    });
  }

  private loadProductsByCategory():void{
    this.pService.getProductsByCategory(this.category_id).subscribe({
      next:(v)=>{
        for(let i in v){
          if(v[i].status==1){
            if(this.cart.length!=0){
              for(let item of this.cart){
                if(item.product.product_id==v[i].product_id){
                  v[i].cart=item;
                  this.products.push(v[i]);
                  break
                }
              }
              if(!v[i].cart)
                  this.products.push(v[i]);
            }
            else{
              this.products.push(v[i]);
            }
            if(this.products[Number(i)].image =='data:image/png;base64,')
              this.products[Number(i)].image='noimg.jpg';
          }
        }
      },error:(e)=>this.swal.errorMessage(e.error?.message)
    });

  }

  private loadAllProducts():void{
    this.pService.getProducts().subscribe({
      next:(v)=>{
        for(let i in v){
          if(v[i].status==1){
            if(this.cart.length!=0){
              for(let item of this.cart){
                if(item.product.product_id==v[i].product_id){
                  v[i].cart=item;
                  this.products.push(v[i]);
                  break
                }
              }
              if(!v[i].cart)
                  this.products.push(v[i]);
            }
            else{
              this.products.push(v[i]);
            }
          }
        }
      },
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>{
        for(let product of this.products)
          this.getImgs(product.product_id); 
      }
    });
  }

//Funciones auxiliares para loadAllProducts 
//####
  //Obtiene las imagenes de los productos
  private getImgs(productId:number):void{
    this.productImageService.getProductImage(productId).subscribe({
      next:(v)=>this.sortedProductImgs.push(v[0]),
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>{
        if(this.products.length==this.sortedProductImgs.length)this.sortimgs()
      }
    });
  }

  //Función para ordenar las imagenes
  private sortimgs():void{
    for(let x:number=0;x<this.products.length;x++)
      for(let y:number=0;y<this.sortedProductImgs.length;y++)
        if(this.products[x].product_id==this.sortedProductImgs[y].product_id){
            this.placeholder=this.sortedProductImgs[x];
            this.sortedProductImgs[x]=this.sortedProductImgs[y];
            this.sortedProductImgs[y]=this.placeholder;
        }
        
  }
//####

  //Función para el botón de agregar 1 item al carrito
  protected addToCart(i:any):void{
    let data={'quantity':1,'gtin':this.products[i].gtin}
    if(this.products[i].cart){
      this.cartService.addToCart(data).subscribe({
        next:(v)=>{
          this.products[i].cart.quantity+=1;
          this.swal.successMessage(v.message);
        },
        error:(e)=>{
          if(e.error.message=='La cantidad es inválida')this.swal.errorMessage("Stock Insuficiente");
          else this.swal.errorMessage(e.error.message);
        }
      });
    }
    else{
      this.products[i].cart=data;
      this.cartService.addToCart(data).subscribe({
        next:(v)=>{
          this.products[i].cart.quantity=1
          this.swal.successMessage(v.message);
        },
        error:(e)=>{
          if(e.error.message=='La cantidad es inválida')this.swal.errorMessage("Stock Insuficiente");
          else this.swal.errorMessage(e.error.message);
          }

      });

    }
    
  }

}

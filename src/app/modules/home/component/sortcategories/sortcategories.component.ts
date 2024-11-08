import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product/_service/product.service';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../shared/shared_module';
import { CategoryService } from '../../../product/_service/category.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Category } from '../../../product/_model/category';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../invoice/_service/cart.service';


@Component({
  selector: 'app-sortcategories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sortcategories.component.html',
  styleUrl: './sortcategories.component.css'
})
export class SortcategoriesComponent implements OnInit {
  products:any=[];
  cart:Array<any>=[];
  category_id:any;
  category:Category=new Category;
  sortedProductImgs:any=[];
  placeholder:any;
  swal:SwalMessages=new SwalMessages;
  faCartShopping=faCartShopping;

  constructor( 
    private route: ActivatedRoute, 
    private pService:ProductService,
    private productImageService:ProductImageService,
    private categoryService:CategoryService,
    private cartService:CartService,
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      this.cartService.getCart().subscribe({
        next:(v)=>{
          if(v.length!=0)this.cart=v;

            this.category_id=params.get('category_id');
            
          if(this.category_id==0){
            this.category.category='Todo';
            this.loadProducts();
          }
          else{
            this.sortedProductImgs=[];
            this.category.category='';
            this.categoryService.getCategory(this.category_id).subscribe(category=>this.category=category);
            this.loadProducts();
          }

  
        },error:(e)=>{
  
        }
      });
      

      }
    );
 
    
  }

  loadProducts(){
    this.products=[];
    if(this.category.category=='Todo'){
       this.pService.getProducts().subscribe({
        next:(v)=>{
          for(let i in v){
            if(v[i].status==1){
              
              if(this.cart){
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

          for(let product of this.products){
            this.getImgs(product.product_id);
          }
        },error:(e)=>this.swal.errorMessage(e.error.message)
      });
    }
    else{
    this.pService.getProductsByCategory(this.category_id).subscribe({
      next:(v)=>{
        for(let i in v){
          if(v[i].status==1){
            if(this.cart){
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
            if(this.products[i].image =='data:image/png;base64,')
              this.products[i].image='';
          }
        }
      },error:(e)=>{

      }
    });
  }

  }

  getImgs(productId:number){
    this.productImageService.getProductImage(productId).subscribe({
      next:(v)=>{
        this.sortedProductImgs.push(v[0]);
        if(this.products.length==this.sortedProductImgs.length)this.sortimgs();
      },error:(e)=>this.swal
    });
  }

  sortimgs(){
    for(let x:number=0;x<this.products.length;x++)
      for(let y:number=0;y<this.sortedProductImgs.length;y++)
        if(this.products[x].product_id==this.sortedProductImgs[y].product_id){
            this.placeholder=this.sortedProductImgs[x];
            this.sortedProductImgs[x]=this.sortedProductImgs[y];
            this.sortedProductImgs[y]=this.placeholder;
        }
        
  }



  addToCart(product:any){
    let data={'quantity':1,'gtin':product.gtin}
    if(product.cart){
      this.cartService.addToCart(data).subscribe({
        next:(v)=>{
          product.cart.quantity+=1;
          this.swal.successMessage(v.message);
        },
        error:(e)=>{
          if(e.error.message=='La cantidad es inválida')this.swal.errorMessage("Stock Insuficiente");
          else this.swal.errorMessage(e.error.message);
        }
      });
    }
    else{
      product.cart=data;
      this.cartService.addToCart(data).subscribe({
        next:(v)=>{
          product.cart.quantity=1;
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

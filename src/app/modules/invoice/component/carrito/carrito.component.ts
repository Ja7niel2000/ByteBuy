import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { SharedModule } from '../../../../shared/shared_module';
import { SwalMessages } from '../../../../shared/swal-messages';
import { faTrashCan,faUser, faLocation, faCreditCard,faListOl,faBagShopping,faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InvoiceService } from '../../_service/invoice.service';
import { Router } from '@angular/router';
import { ProductService } from '../../../product/_service/product.service';

declare var $: any; // JQuery

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

export class CarritoComponent implements OnInit {
  carrito:Array<any>=[];
  swal:SwalMessages=new SwalMessages;
  total:number=0;
  outOfStock:boolean=false;
  faTrashCan=faTrashCan;
  faUser=faUser;
  faLocation=faLocation; 
  faCreditCard=faCreditCard;
  faListOl=faListOl;
  faBagShopping=faBagShopping;
  faCircleExclamation=faCircleExclamation;

  constructor(
    private cartService:CartService, 
    private invoiceService:InvoiceService, 
    private router:Router,
    private productService:ProductService
  ){}

  public ngOnInit():void{
    this.outOfStock=false
    this.getCartItems();
  }

  private getCartItems():void{
    this.cartService.getCart().subscribe({
      next:(v)=>this.carrito=v,
      error:(e)=> this.swal.errorMessage(e.error?.message),
      complete:()=>{
        if(this.carrito.length>0)this.getTotal();
        else this.total=0;
      }
    });
  }

  private getTotal():void{
    this.total = this.carrito.reduce((acc, item) => acc + item.quantity * item.product.price, 0);   
  }

 

  protected removeFromCart(cartId:number):void{
    this.cartService.removeFromCart(cartId).subscribe({
      error:(e)=>this.swal.errorMessage(e.error?.message),
      complete:()=>{
        this.swal.successMessage('Elemento eliminado exitosamente del carrito')
        this.ngOnInit();
      }
    });
  }

  protected clearCartConfirmation():void{
    this.swal.confirmMessage.fire({title:'Estas segur@ de que quieres vaciar el carrito?'})
      .then(result=>{
        if(result.isConfirmed)this.clearCart();
      });
  }

  private clearCart():void{
    this.cartService.clearCart().subscribe({
      error:(e)=>this.swal.errorMessage(e?.error?.message),
      complete:()=>{
        this.swal.successMessage('Carrito vaciado exitosamente'); 
        this.ngOnInit()
      }
    });

  }

  protected verifyProductStock():void{
    for(let item of this.carrito){
      this.productService.getProduct(item.gtin).subscribe({
        next:(v)=>{
          if((v.stock-item.quantity)<0){
            this.outOfStock=true;
            item.quantity=-1;
          }
        },
        error:(e)=>this.swal.errorMessage(e.error?.message),
        complete:()=>{
          if(this.outOfStock){
            this.swal.errorMessage('Hay productos inactivos')

          }
          else
          this.showModal()
        }
      });
    }
  }


  

  

  buy(){
       //Elimina los elementos de carrito que ya no tengan
    for(let i in this.carrito)
      if(this.carrito[i].quantity==-1)this.carrito.splice(Number(i),1);  
    
    this.invoiceService.generateInvoice().subscribe({
      error:(e)=>this.swal.errorMessage(e.error.message),
      complete:()=>{
        this.hideModal();
        this.swal.successMessage('Compra finalizada con exito!');
        this.router.navigateByUrl('/compraExitosa');
      }
    });

  }



 protected showModal():void{
    $("#confirmationModal").modal("show");
  }

  protected hideModal():void{
    $("#confirmationModal").modal("hide");
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_service/cart.service';
import { SharedModule } from '../../../../shared/shared_module';
import { SwalMessages } from '../../../../shared/swal-messages';
import { faTrashCan,faUser, faLocation, faCreditCard,faListOl,faBagShopping,faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InvoiceService } from '../../_service/invoice.service';
import { Router } from '@angular/router';

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
  faTrashCan=faTrashCan;
  faUser=faUser;
  faLocation=faLocation; 
  faCreditCard=faCreditCard;
  faListOl=faListOl;
  faBagShopping=faBagShopping;
  faCircleExclamation=faCircleExclamation;

  constructor(private cartService:CartService, private invoiceService:InvoiceService, private router:Router){}

  public ngOnInit():void{
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

  protected buy():void{
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

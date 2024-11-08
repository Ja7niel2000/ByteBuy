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

  ngOnInit(){
    this.getCartItems();
  }

  getTotal(){
     this.total = this.carrito.reduce((acc, item) => acc + item.quantity * item.product.price, 0);   
  }


  getCartItems(){
    this.cartService.getCart().subscribe({
      next:(v)=>{
        this.carrito=v;
        if(v.length>0)
          this.getTotal();
        else this.total=0
      },
      error:(e)=> this.swal.errorMessage(e?.error?.message)

    })
  }
  removeFromCart(cartId:number){
    this.cartService.removeFromCart(cartId).subscribe({
      next:(v)=>{
        this.swal.successMessage('Elemento eliminado exitosamente del carrito')
        this.ngOnInit();
      },
      error:(e)=>this.swal.errorMessage(e?.error?.message)
    });
  }

  clearCart(){
    this.swal.confirmMessage.fire({
      title:'Estas segur@ de que quieres vaciar el carrito?'

    }).then(result=>{
      if(result.isConfirmed){
        this.cartService.clearCart().subscribe({
          next:(v)=>{
            this.swal.successMessage('Carrito vaciado exitosamente'); 
            this.ngOnInit()
          },
          error:(e)=>this.swal.errorMessage(e?.error?.message)
        });
      }
    })

  }

  buy(){
    this.invoiceService.generateInvoice().subscribe({
      next:(v)=>{
        this.swal.successMessage('Compra finalizada con exito!');
        this.hideModal();
        this.router.navigateByUrl('/compraExitosa');
      },error:(e)=>this.swal.errorMessage(e.error.message)

    });

  }

  showModal(){
    $("#confirmationModal").modal("show");
  }

  hideModal(){
    $("#confirmationModal").modal("hide");
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/shared_module';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../product/_service/product.service';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { SwalMessages } from '../../../../shared/swal-messages';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})

export class HomeComponent implements OnInit {
  faPlusCircle=faPlusCircle;
  products:Array<any> =[];
  swal:SwalMessages=new SwalMessages;
  numbers:Array<number>=[];
  cardsLength:number=4;
  section1:Array<any>=[];
  section2:Array<any>=[];
  section3:Array<any>=[];

  constructor(
    private pService:ProductService, 
    private pImgService:ProductImageService
  ){}

  ngOnInit(): void {
    //Obtiene productos
    this.pService.getProducts().subscribe({
      //Guarda los productos
      next:(v)=>this.products=v, 
      error:(e)=>this.swal.errorMessage(e?.error?.message),
      complete:()=>{
        //Al terminar el observable se itera a traves de los productos para obtener 
        //la primera imagen de cada producto
        for(let i in this.products)this.getImg(this.products[i].product_id,i);

        //funciones para mostrar las secciones de la página de inicio
        this.setNumbers(this.products.length);
        this.organizer();
      }
    });
  }

getImg(productId:number,i:any ):void{
     this.pImgService.getProductImage(productId).subscribe({
      //Al obtener respuesta verifica si existe la imagen. Si existe, se agrega una nueva
      //propiedad image a cada producto del array products con el valor de la imagen.
      //si no existe se agrega "noimg.jpg"
      next:(v)=>v[0]? this.products[i].image= v[0].image:'noimg.jpg',
      error:(e)=>this.swal.errorMessage(e?.error?.message)
     });

  }

  //Función para obtener un número random dentro del intervalo [0,i]
  ranOrd(i:number):number{ return Math.floor(Math.random()*i)}
  
  //Llena el array numbers con números únicos generados aleatoriamente hasta alcanzar la longitud cardsLength.
  //Los números aleatorios son del 1 hasta el valor de la longitud de la variable products.
  setNumbers(top:number):void{
    while(this.numbers.length<this.cardsLength){
      let a=this.ranOrd(top);
      if(!this.numbers.includes(a)) this.numbers.push(a);
    }
  }

  //Esto define que tipo de productos se veran en las 3 secciones de la página de inicio
  organizer():void{
    for(let i in this.products){
      if(this.numbers.includes(Number(i)))this.section1.push(this.products[i]);
      if(this.products[i].category_id==6 && this.section2.length<this.cardsLength)this.section2.push(this.products[i]);
      if(this.products[i].category_id==7 && this.section3.length<this.cardsLength)this.section3.push(this.products[i]);
    }
  }
}

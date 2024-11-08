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
  products:any =[];
  swal:SwalMessages=new SwalMessages;
  numbers:Array<number>=[];
  cardsLength:number=4;

  section1:any=[];
  section2:any=[];
  section3:any=[];

  constructor(private pService:ProductService, private pImgService:ProductImageService){}

  ngOnInit(): void {

    this.pService.getProducts().subscribe({
      next:(v)=>{

        this.products=v;
        for(let i in this.products){
          

          this.getImg(this.products[i].product_id,i);
        }
        this.setNumbers(this.products.length);
        this.organizer();

      },error:(e)=>this.swal.errorMessage(e?.error?.message)
    });

  }

  ranOrd(i:number):number{ return Math.floor(Math.random()*i)}
  
  setNumbers(top:number){
    while(this.numbers.length<this.cardsLength){
      let a=this.ranOrd(top);
      if(!this.numbers.includes(a)) this.numbers.push(a);
    }
    console.log(this.numbers);

  }

  organizer(){
    for(let i in this.products){
      if(this.products[i].category_id==7)this.section3.push(this.products[i])
      if(this.numbers.includes(Number(i)))this.section1.push(this.products[i]);
      if(this.products[i].category_id==6 && this.section2.length<this.cardsLength)this.section2.push(this.products[i]);
    }
    console.log(this.section3);
  }

  getImg(productId:number,i:any ) {
     this.pImgService.getProductImage(productId).subscribe({
      next:(v)=>v[0]? this.products[i].image= v[0].image:'',
      error:(e)=>this.swal.errorMessage(e?.error?.message)
     });

  }
}

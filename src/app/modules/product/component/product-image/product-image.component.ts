import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { SwalMessages } from '../../../../shared/swal-messages';
import { Product } from '../../_model/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared_module';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductImage } from '../../_model/product-image';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { faTrashAlt, faArrowLeft,faPencil } from '@fortawesome/free-solid-svg-icons';

declare var $: any; // JQuery

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.css'
})
export class ProductImageComponent {

  swal:SwalMessages = new SwalMessages;
  product: Product= new Product;
  productImgList:any=[];
  productImg:ProductImage=new ProductImage();
  gtin:any| String="";
  categories: any;
  form:FormGroup;
  submitted:Boolean=false;
  faTrash=faTrashAlt;
  faArrowLeft=faArrowLeft;
  faPencil=faPencil;

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private productImgService:ProductImageService,
    private photoService:NgxPhotoEditorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
  ){
    this.form = this.formBuilder.group({
      product: ["", [Validators.required]],
      gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      description: ["", [Validators.required]],
      price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      category_id: [0, [Validators.required]]
    });
  }

  ngOnInit(updatedGtin:String=''){
    if(updatedGtin!==''){
      this.gtin=updatedGtin;
    }
    else{
      this.gtin = this.route.snapshot.paramMap.get('gtin');
      console.log(this.route.snapshot.paramMap.get('gtin'));
    }
    return this.getProduct();
  }


  fileChangeHandler($event:any){    
    this.photoService.open($event,{
      aspectRatio: 7 / 8,
      autoCropArea: 1,
      resizeToWidth: 315,
      resizeToHeight: 360
    }).subscribe(data=>{
      this.productImg.product_id = this.product.product_id;
      this.productImg.image = data.base64!;
      this.postImg();
    });

  }
  
  postImg(){
    this.productImgService.uploadProductImage(this.productImg).subscribe({
      next:(v)=>{
        this.swal.successMessage('Imagen subida correctamente');
        this.ngOnInit();
      }
      ,error:(e)=>
        this.swal.errorMessage(e.error.message)
      
    });

  }

  deleteProductImage(id:any){
    this.swal.confirmMessage.fire({
      title: "Favor de confirmar la eliminación",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productImgService.deleteProductImage(id).subscribe({
          next:(v)=>{
            this.swal.successMessage('Imagen eliminada exitosamente');
            this.ngOnInit();
    
          },
          error:(e)=> this.swal.errorMessage(e.error.message)
        });
        
      }
    });
   
    
  }
  getProductImage(){
    this.productImgService.getProductImage(this.product.product_id).subscribe({
      next:(v)=>{
        console.log(v);
        this.productImgList=v;


      },error:(e)=>{
        this.swal.errorMessage(e.error.message);

      }
    });

  }


  redirect(url:String[]){
    this.router.navigate(url);
  }

  updateProduct(){
    this.showModalForm();
    this.form.reset();
    this.submitted=false;
    this.getCategories();

    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['description'].setValue(this.product.description);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);
   
  }

  onSubmit(){
    
    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe({
      next:(v)=>{
        this.swal.successMessage('Todo bien');

        if(this.form.controls['gtin'].value!=this.gtin)
          this.router.navigate(['product/'+this.form.controls['gtin'].value]);
        
        this.ngOnInit(this.form.controls['gtin'].value);

        this.hideModalForm();
        
      },error:(e)=>{
        this.swal.errorMessage(e.error.message);



      }

    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(v)=>{
        this.categories=v;
      },error:(e)=>{
        this.swal.errorMessage(e.error.message);
      }
    });

  }

  getProduct(){
    this.productService.getProduct(this.gtin).subscribe({
      next:(v)=>{
        this.product=v;
        this.getProductImage();

      },error:(e)=>{
        this.swal.errorMessage(e.error.message);
      }
    });

  }

  hideModalForm(){
    $("#modalForm").modal("hide");
  }
  showModalForm(){
    $("#modalForm").modal("show");
  }

}

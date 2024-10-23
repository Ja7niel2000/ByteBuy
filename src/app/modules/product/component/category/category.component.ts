import { Component, inject } from '@angular/core';
import { CategoyService } from '../../_service/categoy.service';
import { Category } from '../../_model/category';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared_module';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

declare var $:any;

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})

export class CategoryComponent {
  form :FormGroup;
  categories: any = [];
  submitted: boolean = false;
  swal:SwalMessages = new SwalMessages();
  modal:String="normal";
  faPencil=faPencil;
  admin:any =(window.localStorage.getItem("user")?.match(/"rol":"(.*?)"/)?.[1])=="ADMIN"? true:false ;
  id:any =null;

  constructor(private categoryService:CategoyService, private formBuilder:FormBuilder ){
    this.form = this.formBuilder.group({
      category:["",[Validators.required]],
      tag:["",[Validators.required]]

  
    });

  }
  ngOnInit():void{
    this.categories=this.getCategories();
    console.log(this.admin);
  }

  getCategories(){
    return this.categoryService.getCategories().subscribe({
      next:(v)=>{
        this.categories=v;
        console.log(v);
      },
      error:(e)=>{
        this.swal.errorMessage("No hay un listado de categorias ");
      }
    });
  }

  onSubmit(){
    this.submitted =true;
    if(this.form.invalid)return;
    this.submitted=false;

      if(this.modal=="normal")      this.onSubmitCreate();
      else                          this.onSubmitUpdate();
    
    this.modal="normal";

  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe({
      next:(v) =>{
        this.swal.successMessage("La categoria ha sido creada");
        this.getCategories();
        this.hideModalForm();
      
      },
      error: (e) =>{
        this.swal.errorMessage("No se pudo crear la categoria"+e.error.message);
      }
    });
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value,this.id).subscribe({
      next:(v) => {
        this.swal.successMessage("La categoria ha sido actualizada");
        this.getCategories();
        this.hideModalForm();
        this.modal ="normal";
      }, error: (e)=>{
        this.swal.errorMessage("No se pudo actualizar la categoria. "+e.error.message); 
      }
    });
  }

  updateCategory(category:Category){
    this.modal = "update";
    this.id = category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

 
  enableCategory(id:number){
    this.categoryService.activateCategory(id).subscribe({
      next:(v)=>{
        this.swal.successMessage("La categoria ha sido activada");
        this.getCategories();

      },error:(e)=>{
        this.swal.errorMessage("No se pudo activar la categoria"); 
      }
    });
  }

  disableCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe({
      next:(v)=>{
        this.swal.successMessage("La categoria ha sido eliminada");
        this.getCategories();

      },error:(e)=>{
        this.swal.errorMessage("No se pudo eliminar la categoria"); 
      }
    });
  }

 
  showModalForm():void{
    this.submitted = false;
    this.form.reset();
    $("#modalForm").modal("show");
  }

  hideModalForm():void{
    $("#modalForm").modal("hide");

  }

}

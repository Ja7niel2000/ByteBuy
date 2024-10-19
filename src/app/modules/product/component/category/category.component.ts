import { Component } from '@angular/core';
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
  categoryUpdate:number=0;
  faPencil=faPencil;

  constructor(private categoryService:CategoyService, private formBuilder:FormBuilder ){
    this.form = this.formBuilder.group({
      category:["",[Validators.required]],
      tag:["",[Validators.required]]

  
    });

  }
  ngOnInit():void{
    this.categories=this.getCategories();
  }

  getCategories(){
    return this.categoryService.getCategories().subscribe({
      next:(v)=>{
        this.categories=v;
        console.log(v);
      },
      error:(e)=>{
        this.swal.errorMessage("No hay un listado de categorias "+e);
      }
    });
  }

  onSubmit(){
    this.submitted =true;
    if(this.form.invalid)return;
    this.submitted=false;

    this.onSubmitCreate();
    if(this.categoryUpdate==0){
      this.onSubmitCreate();
    }else{
      console.log("TRUE");
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe({
      next:(v) =>{
        this.swal.successMessage("La categoria ha sido creada");
        this.getCategories();
        this.hideModalForm();
      
      },
      error: (e) =>{
        this.swal.errorMessage("No se pudo crear la categoria");
      }
    });
  }

  updateCategory(category:Category){
    this.categoryUpdate = category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['tag'].setValue(category.tag);

    console.log(this.form.value);
    this.submitted = false;
    console.log(this.categoryUpdate);
    $("#modalForm").modal("show");
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdate).subscribe({
      next:(v) => {
        this.swal.successMessage("La categoria ha sido actualizada");
        this.getCategories();
        this.hideModalForm();
        this.categoryUpdate =0;
      }, error: (e)=>{
        this.swal.errorMessage("No se pudo actualizar la categoria. "+e); 
      }
    });
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

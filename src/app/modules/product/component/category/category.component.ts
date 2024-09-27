import { Component } from '@angular/core';
import { CategoyService } from '../../_service/categoy.service';
import { Category } from '../../_model/category';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { SwalMessages } from '../../../../shared/swal-messages';
import { SharedModule } from '../../../../shared/shared_module';

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
  categories: Category[]=[];
  submitted: boolean = false;
  swal:SwalMessages = new SwalMessages();

  constructor(private categoryService:CategoyService, private formBuilder:FormBuilder ){
    this.form = this.formBuilder.group({
      category:["",[Validators.required]],
      code:["",[Validators.required]]
  
    });

  }

  onSubmit(){
    this.submitted =true;
    if(this.form.invalid)return;
    this.submitted=false;

    let id = this.categories.length + 1;
    let category = new Category(id, this.form.controls["category"].value!,this.form.controls["code"].value,1);
    this.categories.push(category)

    this.hideModalForm();

    this.swal.successMessage("La categoria ha sido registrada");

  }

  getCategories():void{
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit():void{
    this.getCategories();
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

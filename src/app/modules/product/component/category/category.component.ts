import { Component } from '@angular/core';
import { CategoyService } from '../../_service/categoy.service';
import { Category } from '../../_model/category';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: Category[]=[];
  constructor(private categoryService:CategoyService){}

  getCategories():void{
    this.categories = this.categoryService.getCategories();
  }
  ngOnInit():void{
    this.getCategories();
  }

}

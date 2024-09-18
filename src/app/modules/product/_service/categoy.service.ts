import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoyService {

  constructor() { }

  getCategories():Category[]{
    let categories: Category[]=[];

    categories.push(new Category(1, "Column content", "Column content", 0));
    categories.push(new Category(2, "Column content", "Column content", 1));
    categories.push(new Category(3, "Column content", "Column content", 1));
    return categories;

  }
}

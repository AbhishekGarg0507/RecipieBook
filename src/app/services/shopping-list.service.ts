import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  private ingredients:Ingredient[]=[ 
    new Ingredient('apple',5),
    new Ingredient('Tomatoes',10)
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(ing:Ingredient){
    this.ingredients.push(ing);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  
  addIngredientR(ingred:Ingredient[]){
    this.ingredients.push(...ingred);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

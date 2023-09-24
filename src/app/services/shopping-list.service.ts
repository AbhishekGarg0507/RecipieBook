import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
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
    this.ingredientChanged.emit(this.ingredients.slice());
  }
  
  addIngredientR(ingred:Ingredient[]){
    this.ingredients.push(...ingred);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}

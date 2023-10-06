import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  editIngredient = new Subject<number>();
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

  getIngredient(id:number){
    return this.ingredients[id];
  }

  updateIngredient(id:number , newIngredient:Ingredient){
    this.ingredients[id] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id:number){
    this.ingredients.splice(id,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}

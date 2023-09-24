import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'

})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is the test description for the recipe','../assets/recipe1.jpg',[
      new Ingredient('meat',1),
      new Ingredient('french Fries',1)
    ]),
    new Recipe('Another Test Recipe', 'This is the dsgsdgbfs test description for the recipe','../assets/recipe1.jpg',[
      new Ingredient('meat',2),
      new Ingredient('french Fries',1),
      new Ingredient('bun',1),
    ])
  ];

  constructor(private slService:ShoppingListService) { }

  getRecipe(){

    return this.recipes.slice();
  }

  OnAddToShoppingList(ingredient:Ingredient[]){
    this.slService.addIngredientR(ingredient);
  }
}

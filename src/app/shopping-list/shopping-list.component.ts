import { Component } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients:Ingredient[]=[
    new Ingredient('apple',5),
    new Ingredient('Tomatoes',10)
  ];

  onIngredientAdded(ing:Ingredient){
    this.ingredients.push(ing);
  }
}

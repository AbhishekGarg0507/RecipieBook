import { Component } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css']
})
export class RecipiesComponent {
  selectedRecipe:Recipe;
}

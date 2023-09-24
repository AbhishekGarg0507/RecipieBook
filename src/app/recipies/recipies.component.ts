import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
  providers: [RecipeService]
})
export class RecipiesComponent implements OnInit{
  selectedRecipe:Recipe;

  constructor(private recipeService:RecipeService){}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe:Recipe) =>{
        this.selectedRecipe = recipe;
      }
    )
  }

}

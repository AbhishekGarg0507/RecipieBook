import { Component, OnInit, EventEmitter ,Output} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'This is the test description for the recipe','../assets/recipe1.jpg'),
    new Recipe('Another Test Recipe', 'This is the dsgsdgbfs test description for the recipe','../assets/recipe1.jpg')
  ];

  constructor(){}

  ngOnInit(): void {
    
    
  }
  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}

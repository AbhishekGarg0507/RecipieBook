import { EventEmitter } from '@angular/core';
import { Component, Input ,Output} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;

  constructor(private recipeService:RecipeService){}
  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}

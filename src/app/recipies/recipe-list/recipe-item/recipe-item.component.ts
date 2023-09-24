import { EventEmitter } from '@angular/core';
import { Component, Input ,Output} from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe:Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  onSelected(){
    this.recipeSelected.emit();
  }
}

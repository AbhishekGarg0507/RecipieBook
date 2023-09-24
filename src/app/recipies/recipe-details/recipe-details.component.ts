import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { DropdownDirective } from 'src/app/shared/dropdown.directive';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input() recipe:Recipe;
}

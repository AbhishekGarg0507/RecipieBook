import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { DropdownDirective } from 'src/app/shared/dropdown.directive';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService,
    private activatedRoute:ActivatedRoute,
    private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params) =>{
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipes(this.id);
    });
  }

  addToShoppingList(){
    this.recipeService.OnAddToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.activatedRoute});
    // this.router.navigate(['../' , this.id,'edit'], {relativeTo:this.activatedRoute});  // alternative but complex
  }
}

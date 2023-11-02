import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class DataStorageService {

  constructor(private http:HttpClient,
    private recipeservice:RecipeService) { }

  storeRecipe( ){
    const recipes = this.recipeservice.getRecipe();
    this.http.put('https://recipe-book-cdbfb-default-rtdb.firebaseio.com/recipes.json' , recipes).subscribe(response =>{
      console.log(response);
      
    })
  }

  fetchRecipe(){
    return this.http.get<Recipe[]>('https://recipe-book-cdbfb-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes =>{
      return recipes.map(recipe =>{
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes =>{
      this.recipeservice.setRecipe(recipes);
    })
    )
  }
}

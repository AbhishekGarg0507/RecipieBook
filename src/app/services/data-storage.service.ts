import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
}) 
export class DataStorageService {

  constructor(private http:HttpClient,
    private recipeservice:RecipeService,
    private authservice:AuthService) { }

  storeRecipe( ){
    const recipes = this.recipeservice.getRecipe();
    this.http.put('https://recipe-book-cdbfb-default-rtdb.firebaseio.com/recipes.json' , recipes)
    .subscribe(response =>{
      console.log(response);
      
    })
  }

  fetchRecipe(){
    return this.authservice.user.pipe(take(1),exhaustMap(user =>{
      return this.http.get<Recipe[]>(
        'https://recipe-book-cdbfb-default-rtdb.firebaseio.com/recipes.json',
        {
          params:new HttpParams().set('auth' , user.token)
        }
      );
    }),
    map(recipes =>{
      return recipes.map(recipe =>{
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes =>{
      this.recipeservice.setRecipe(recipes);
    }));
  
  }
}

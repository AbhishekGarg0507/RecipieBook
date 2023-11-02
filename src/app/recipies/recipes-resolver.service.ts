import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Recipe } from "../models/recipe.model";
import { DataStorageService } from "../services/data-storage.service";
import { RecipeService } from "../services/recipe.service";

@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private datastorageService: DataStorageService,
        private recipeservice:RecipeService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeservice.getRecipe();

        if(recipes.length === 0){
            return this.datastorageService.fetchRecipe();
        }else{
            return recipes;
        }
    }
}
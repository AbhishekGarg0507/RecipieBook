import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { AboutComponent } from './about/about.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipies/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipies/recipes-resolver.service';

const routes: Routes = [
  {path:'',redirectTo:'/recipes', pathMatch:'full'},
  {path:'recipes' , component:RecipiesComponent ,
    children:[
      {path:'',component:RecipeStartComponent},
      {path:'new',component:RecipeEditComponent},
      {path:':id',component:RecipeDetailsComponent , resolve:[RecipeResolverService]},
      {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]},

    ]
  },
  {path:'shopping-list' , component:ShoppingListComponent },
  {path:'about' , component:AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { } 

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { RecipiesComponent } from "./recipies.component";
import { PagenotfoundComponent } from "../pagenotfound/pagenotfound.component";

const routes = [
    {path:'recipes' , component:RecipiesComponent ,
    canActivate:[AuthGuard] , 
    children:[
      {path:'',component:RecipeStartComponent},
      {path:'new',component:RecipeEditComponent},
      {path:':id',component:RecipeDetailsComponent , resolve:[RecipeResolverService]},
      {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]},
      {path:'**' , component:PagenotfoundComponent}
    ]
  },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class RecipiesRoutingModule{}
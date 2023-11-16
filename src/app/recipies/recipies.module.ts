import { NgModule } from "@angular/core";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipiesComponent } from "./recipies.component";

@NgModule({
    declarations:[
        RecipiesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
    ],
    imports:[

    ],
    exports:[

    ]
})
export class RecipiesModule{}
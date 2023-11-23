import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'' , component:HomeComponent },
  {path:'about' , component:AboutComponent },
  {path:'recipes' ,
    loadChildren: () => import('./recipies/recipies.module').then(m => m.RecipiesModule)
  },
  {path:'shopping-list' ,
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {path:'auth' ,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes  , {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { } 

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private igChangeSubs: Subscription;
  constructor(private slService:ShoppingListService ){}
  
  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSubs = this.slService.ingredientChanged.subscribe((ingredients:Ingredient[]) =>{
      this.ingredients = ingredients;
    })
  }

  onEditItem(id:number){
    this.slService.editIngredient.next(id);
    
  }
  ngOnDestroy(): void {
    this.igChangeSubs.unsubscribe();  
  }
}

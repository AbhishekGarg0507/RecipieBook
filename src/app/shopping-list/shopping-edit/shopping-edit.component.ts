import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from './../../models/ingredient.model';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slform:NgForm;
  subscription:Subscription;
  editMode:boolean = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slService:ShoppingListService){}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.subscription = this.slService.editIngredient
    .subscribe((id:number) => {
      this.editedItemIndex = id;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(id);
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.slService.addIngredients(newIngredient);
    }
    this.editMode = false;
    this.slform.reset();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }
}

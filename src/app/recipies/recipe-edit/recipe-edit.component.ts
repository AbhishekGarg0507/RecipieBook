import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit  {
  id : number;
  editMode = false;
  recipeForm:FormGroup;
  ingLabelFlag:boolean = false;

  constructor(private activatedRoute:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] !=  null;
      this.initForm();
    })
  }

  onSubmit(){
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imgredients']
    //   )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id , this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onAddIngredient(){
    this.ingLabelFlag = true;
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl('',Validators.required),
        'amount':new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
      })
    )
  }

  onDeleteIngredient(i){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
    if(i == 0)this.ingLabelFlag = false;
  }

  onCancel(){
    this.router.navigate(['../'] , {relativeTo:this.activatedRoute})
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

    if(this.editMode){
      this.ingLabelFlag = true;
      const recipe = this.recipeService.getRecipes(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ing of recipe.ingredients){
          recipeIngredient.push(
            new FormGroup({
              'name': new FormControl(ing.name,Validators.required),
              'amount': new FormControl(ing.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngredient
    });
  }
}

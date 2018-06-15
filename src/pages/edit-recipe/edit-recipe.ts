import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/implementations/recipe.service';
import { Ingredient } from '../../models/ingredient';

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  recipeToEdit = {id: 0, name: '', description: '', ingredientList: [], imgPath: ''};
  editionMode: boolean;
  fridgeIngredientList: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public recipeService: RecipeService) {
  }

  ngOnInit(){
    this.recipeToEdit = this.navParams.data.recipe;
    if(this.navParams.data.type == "edit"){
      this.editionMode = true;
    }else{
      this.editionMode = false;
    }
  }

  cancel(){
    this.navCtrl.pop();     
  }

  register(recipe: Recipe): void {
    if(this.editionMode){
      this.recipeService.editRecipe(recipe);
    }else{
      this.recipeService.addRecipe(recipe);
    }
    this.navCtrl.pop();         
  }

  addNewIngredient(): void {
    let newIngredient: Ingredient;
    newIngredient = {id: this.recipeToEdit.ingredientList.length +1, name: '', quantity: 0, unity: '', peremptionDate: new Date()};

    this.recipeToEdit.ingredientList.push(newIngredient);
  }
}

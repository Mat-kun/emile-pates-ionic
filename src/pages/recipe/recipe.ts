import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { FridgeService } from '../../services/implementations/fridge.service';
import { RecipeService } from '../../services/implementations/recipe.service';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams, 
     public recipeService: RecipeService, 
     public fridgeService: FridgeService
    ) {
  }

  recipesList: Recipe[];
  recipeToEdit: Recipe;
  recipeToAdd: Recipe;
  creationMode: boolean;
  editionMode: boolean;
  fridgeIngredientList: Ingredient[];

  /*@ViewChild('editOrAddModal')
  editOrAddModal: ModalDirective;*/

  ngOnInit() {
    this.getRecipes();
    this.fridgeIngredientList = this.fridgeService.getFridgeIngredients();
  }

  getRecipes(): Recipe[] {
    this.recipesList = this.recipeService.getAllRecipes();
    return this.recipesList;
  }

  prepareForEditRecipe(recipe: Recipe): void {
    //this.recipeToEdit = _.clone(recipe);
    const name: string = this.recipeToEdit.name;
    this.editionMode = true;
    this.creationMode = false;
    //this.editOrAddModal.show();
  }

  editRecipe(recipe: Recipe): void {
    this.recipeService.editRecipe(recipe);
    this.editionMode = false;
    //this.editOrAddModal.hide();
  }

  prepareForAddRecipe(): void {
    this.recipeToEdit = {id: 0, name: '', description: '', ingredientList: [], imgPath: ''};
    this.creationMode = true;
    this.editionMode = false;
    //this.editOrAddModal.show();
  }

  addRecipe(recipe: Recipe): void {
    this.recipeService.addRecipe(recipe);
    this.creationMode = false;
    //this.editOrAddModal.hide();
  }

  addNewIngredient(): void {
    let newIngredient: Ingredient;
    newIngredient = {id: 0, name: '', quantity: 0, unity: '', peremptionDate: new Date()};

    this.recipeToEdit.ingredientList.push(newIngredient);
  }

  // verifie si l'ingredient est utilisable pour la recette (quantité, date de peremption, s'il est present)
  isIngredientAvailaible(ingredient: Ingredient) {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < this.fridgeIngredientList.length; i++) {
      this.fridgeIngredientList[i].peremptionDate.setHours(0, 0, 0, 0);
      if (ingredient.name.toLowerCase() === this.fridgeIngredientList[i].name.toLowerCase()) {
        console.log(ingredient.name.toLowerCase() + ' : ' + this.fridgeIngredientList[i].name.toLowerCase());
        console.log(ingredient.unity.toLowerCase() + ' : ' + this.fridgeIngredientList[i].unity.toLowerCase());
        console.log(today + ' : ' + this.fridgeIngredientList[i].peremptionDate);
        console.log(ingredient.quantity + ' : ' + this.fridgeIngredientList[i].quantity);
      }
      if (ingredient.name.toLowerCase() === this.fridgeIngredientList[i].name.toLowerCase()
      && ingredient.unity.toLowerCase() === this.fridgeIngredientList[i].unity.toLowerCase()
      && today <= this.fridgeIngredientList[i].peremptionDate
      && ingredient.quantity <= this.fridgeIngredientList[i].quantity
      ) {
          console.log(ingredient.name + 'is Available');
          return true;
        }
      }
    return false;
  }

  // verifie si la recette est realisable ou s'il y a un probleme avec un ingredient
  /*canRealizeRecipe(recipe: Recipe): boolean {
    const today: Date = new Date();
    let canRealize = true;
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < this.fridgeIngredientList.length; i++) {
      for (let j = 0; j < recipe.ingredientList.length; j++) {
        this.fridgeIngredientList[i].peremptionDate.setHours(0, 0, 0, 0);
        if (recipe.ingredientList[j].name.toLowerCase() === this.fridgeIngredientList[i].name.toLowerCase()) {
          if ( recipe.ingredientList[j].quantity > this.fridgeIngredientList[i].quantity ||
            today > this.fridgeIngredientList[i].peremptionDate ) {
            canRealize = false;
          }
        }
      }
    }
    if (this.fridgeIngredientList.length === 0) {
      canRealize = false;
    }
    return canRealize;
  }*/

  canRealizeRecipe(recipe: Recipe): boolean {
    let canRealize = true;
      for (let i = 0; i < recipe.ingredientList.length; i++) {
        if (!this.isIngredientAvailaible(recipe.ingredientList[i])) {
            canRealize = false;
        }
    }
    if (this.fridgeIngredientList.length === 0) {
      canRealize = false;
    }
    return canRealize;
  }

  realizeRecipe(recipe: Recipe): void {
    for (let i = 0; i < this.fridgeIngredientList.length; i++) {
      for (let j = 0; j < recipe.ingredientList.length; j++) {
        if (recipe.ingredientList[j].name.toLowerCase() === this.fridgeIngredientList[i].name.toLowerCase() &&
          recipe.ingredientList[j].quantity <= this.fridgeIngredientList[i].quantity) {
          const fridgeIngredient = this.fridgeService.getIngredientById(this.fridgeIngredientList[i].id);
          fridgeIngredient.quantity = fridgeIngredient.quantity - recipe.ingredientList[j].quantity;
          if (fridgeIngredient.quantity > 0) {
            this.fridgeService.editIngredient(fridgeIngredient);
          }else {
            this.fridgeService.removeIngredient(fridgeIngredient);
          }
        }
      }
    }
    //this.router.navigate(['/']);
  }

  removeRecipe(recipe: Recipe) {
    this.recipeService.removeRecipe(recipe);
  }
}

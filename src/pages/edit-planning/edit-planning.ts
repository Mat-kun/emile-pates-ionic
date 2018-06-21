import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Planning, DailyMeal, Day } from '../../models/planning';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/implementations/recipe.service';
import { PlanningService } from '../../services/implementations/planning.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';
import { Ingredient} from '../../models/ingredient';
import { ShoppingList } from '../../models/shopping-list';
import { ShoppingListPage } from '../shopping-list/shopping-list';

/**
 * Generated class for the EditPlanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-planning',
  templateUrl: 'edit-planning.html',
})
export class EditPlanningPage implements OnInit {

  planningToEdit: Planning;
  newPlanning: Planning;
  editionMode: boolean;
  days: Day;
  recipesList: Recipe[];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public recipeService: RecipeService, public planningService: PlanningService, public shoppingListService: ShoppingListService) {
  }

  ngOnInit(){
    this.planningToEdit = this.navParams.data.planning;
    if(this.navParams.data.type == "edit"){
      this.editionMode = true;
    }else {
      this.editionMode = false;
    }
    this.getRecipes();
  }

  getRecipes(): Recipe[] {
    this.recipesList = this.recipeService.getAllRecipes();
    return this.recipesList;
  }

  cancel(){
    this.navCtrl.pop();
  }

  register(planning: Planning): void{
    if(this.editionMode){
      this.planningService.editPlanning(planning);
    }else{
      this.planningService.addPlanning(planning);
    }
    this.navCtrl.pop();
  }

  // creer la liste de courses du planning selectionné
  setShoppingList(planning: Planning): void {
    let planningIngredients: Ingredient[] = [];
    const shoppingListIngredients: Ingredient[] = [];
    let shoppingList: ShoppingList;
    shoppingList = { id: 0, name: 'Ma liste de courses de la semaine "' + planning.name + '"', ingredientList: [] };

    //console.log("planning:", planning);
    // une liste d'ingredients est créée en ajoutant tout les ingredients des recettes de chaque repas de chaque jours
    for (let i = 0; i < planning.meals.length; i++) {
      const meal = planning.meals[i];

      if (meal.breakfast != null) {
        planningIngredients.push(...meal.breakfast.ingredientList);
      }
      if (meal.lunch != null) {
        planningIngredients.push(...meal.lunch.ingredientList);
      }
      if (meal.dinner != null) {
        planningIngredients.push(...meal.dinner.ingredientList);
      }
    }
    let found: boolean;

    // console.log('Ingrédients dans le planning (doublons non-exclus):', planningIngredients);

    // double boucle parcourant la liste d'ingredients afin d'eviter d'avoir des doublons et plutot mettre a jours les quantités d'ingredients
    for (let i = 0; i < planningIngredients.length; i++) {
      found = false;
      const planningIngredient = { ...planningIngredients[i] };

      if (shoppingListIngredients.length > 0) {
        for (let j = 0; j < shoppingListIngredients.length; j++) {
          const shoppingListIngredient = shoppingListIngredients[j];
          // console.log('Traitement de', shoppingListIngredient);

          if (shoppingListIngredient.name.toLowerCase() === planningIngredient.name.toLowerCase()) {
            // console.log('Ajout de', shoppingListIngredient.quantity, 'de', shoppingListIngredient.name);
            shoppingListIngredient.quantity += planningIngredient.quantity;
            found = true;

            shoppingListIngredients[j] = shoppingListIngredient;

            break;
          }
        }

        if (!found) {
          shoppingListIngredients.push(planningIngredient);
        }
      } else {
        shoppingListIngredients.push(planningIngredient);
      }
    }

    shoppingList.ingredientList = shoppingListIngredients;
    // une fois l'operation effectué on peut ajouter a la liste de courses notre liste d'ingredients.
    this.shoppingListService.addShoppingList(shoppingList);
    this.navCtrl.setRoot(ShoppingListPage);
  }
}

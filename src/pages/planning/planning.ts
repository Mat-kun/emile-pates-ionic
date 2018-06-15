import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeService } from '../../services/implementations/recipe.service';
import { PlanningService } from '../../services/implementations/planning.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';
import { Recipe } from '../../models/recipe';
import { Planning, Day } from '../../models/planning';
import { Ingredient } from '../../models/ingredient';
import { ShoppingList } from '../../models/shopping-list';

/**
 * Generated class for the PlanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planning',
  templateUrl: 'planning.html',
})
export class PlanningPage {
  recipesList: Recipe[];
  planningList: Planning[];
  newPlanning: Planning;
  days: Day;
  editing: boolean;

  constructor(private recipeService: RecipeService,
    private planningService: PlanningService,
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit() {
    this.editing = false;
    this.initPlanning();
    this.getRecipes();
    this.getPlanning();
  }

  initPlanning(): Planning {
    this.newPlanning = {
      id: 0,
      name: 'Mes Repas De La Semaine',
      meals: [
        { day: Day.Monday, breakfast: null, lunch: null, dinner: null },
        { day: Day.Tuesday, breakfast: null, lunch: null, dinner: null },
        { day: Day.Wednesday, breakfast: null, lunch: null, dinner: null },
        { day: Day.Thursday, breakfast: null, lunch: null, dinner: null },
        { day: Day.Friday, breakfast: null, lunch: null, dinner: null },
        { day: Day.Saturday, breakfast: null, lunch: null, dinner: null },
        { day: Day.Sunday, breakfast: null, lunch: null, dinner: null },
      ],
      startingDay: new Date()
    };
    return this.newPlanning;
  }

  getRecipes(): Recipe[] {
    this.recipesList = this.recipeService.getAllRecipes();
    return this.recipesList;
  }

  registerPlanning(planning: Planning): void {
    this.planningService.addPlanning(planning);
    this.initPlanning();
    this.getPlanning();
  }

  getPlanning(): Planning[] {
    this.planningList = this.planningService.getAllPlannings();
    return this.planningList;
  }

  prepareForEditPlanning(planning: Planning): void {
    this.editing = true;
    this.newPlanning = planning;
  }

  editPlanning(planning: Planning): void {
    this.planningService.editPlanning(planning);
    this.editing = false;
    this.initPlanning();
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
          // console.log('Ajout de', planningIngredient.quantity, 'de', planningIngredient.name);
          shoppingListIngredients.push(planningIngredient);
        }
      } else {
        // console.log('Ajout de', planningIngredient.quantity, 'de', planningIngredient.name);
        shoppingListIngredients.push(planningIngredient);
      }
    }

    // console.log(shoppingListIngredients);
    shoppingList.ingredientList = shoppingListIngredients;
    // une fois l'operation effectué on peut ajouter a la liste de courses notre liste d'ingredients.
    this.shoppingListService.addShoppingList(shoppingList);
    this.initPlanning();
    //this.router.navigate(['/shopping-list']);
  }
}

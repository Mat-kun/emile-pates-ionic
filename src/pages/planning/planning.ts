import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipeService } from '../../services/implementations/recipe.service';
import { PlanningService } from '../../services/implementations/planning.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';
import { Recipe } from '../../models/recipe';
import { Planning, Day } from '../../models/planning';
import { Ingredient } from '../../models/ingredient';
import { ShoppingList } from '../../models/shopping-list';
import { EditPlanningPage } from '../edit-planning/edit-planning';

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
export class PlanningPage implements OnInit {
  recipesList: Recipe[];
  planningList: Planning[];
  newPlanning: Planning;
  days: Day;
  editing: boolean;

  constructor(private recipeService: RecipeService,
    private planningService: PlanningService,
    private shoppingListService: ShoppingListService,
    public navCtrl: NavController,
    public navParams: NavParams, 
  ) { }

  ngOnInit() {
    this.editing = false;
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

  getPlanning(): Planning[] {
    this.planningList = this.planningService.getAllPlannings();
    return this.planningList;
  }

  prepareForEditPlanning(planning: Planning): void {
    this.navCtrl.push(EditPlanningPage, {planning: planning, type: 'edit'});
  }

  prepareForAddPlanning(): void {
    this.initPlanning();
    this.navCtrl.push(EditPlanningPage, {planning: this.newPlanning, type: 'add'});
  }

  deletePlanning(planning: Planning): void{
    this.planningService.removePlanning(planning);
  }
}

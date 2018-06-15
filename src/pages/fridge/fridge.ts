import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FridgeService } from '../../services/implementations/fridge.service';
import {Ingredient} from '../../models/ingredient';
import { EditIngredientPage } from '../edit-ingredient/edit-ingredient';

/**
 * Generated class for the FridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage implements OnInit {


  id: number;
  name: string;
  quantity: number;
  unity: string;
  peremptionDate: Date;

  ingredientList: Ingredient[];
  ingredientToEdit: Ingredient;
  ingredientToAdd: Ingredient;
  creationMode: boolean;
  editionMode: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fridgeService: FridgeService) {
  }

  ngOnInit() {
    this.getIngredients();
    this.creationMode = false;
    this.editionMode = false;
  }

  prepareForEditIngredient(ingredient: Ingredient): void {
    this.navCtrl.push(EditIngredientPage, {ingredient:ingredient, type:"edit"});
  }

  getIngredients(): Ingredient[] {
    this.ingredientList = this.fridgeService.getFridgeIngredients();
    return this.ingredientList;
  }

  removeIngredient(ingredient: Ingredient): void {
    this.fridgeService.removeIngredient(ingredient);
  }

  prepareForAddIngredient(): void {
    this.ingredientToEdit = {id: 0, name: '', quantity: 0, unity: '', peremptionDate: new Date()};
    this.creationMode = true;
  }

  // permet de savoir si un ingredient est périmé
  comparePeremptionDate(peremptionDate): boolean {
    const today: Date = new Date();
    peremptionDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (today > peremptionDate) {
      return true;
    }else if (today < peremptionDate) {
      return false;
    }else {
      // cas ou la date du jour et la date de peremption son egaux, le '===' ne fonctionne pas
      return false;
    }
  }

}

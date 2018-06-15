import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingList } from '../../models/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { FridgeService } from '../../services/implementations/fridge.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';
import { EditIngredientPage } from '../edit-ingredient/edit-ingredient';
import { IngredientService } from '../../services/implementations/ingredient.service';

/**
 * Generated class for the EditShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-list',
  templateUrl: 'edit-shopping-list.html',
})
export class EditShoppingListPage implements OnInit{
  shoppingListToEdit: ShoppingList;
  editionMode: boolean;
  ingredientsToAdd: Ingredient[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
  ) {
  }
  
    ngOnInit(): void {
      this.ingredientsToAdd= [];
      this.shoppingListToEdit = this.navParams.data.shoppingListToEdit;
      if(this.navParams.data.type == "edit"){
        this.editionMode = true;
      }else{
        this.editionMode = false;
      }
    }

    addIngredient(): void {
      const d = new Date();
      d.setDate(d.getDate() + 14);
      let ingredient: Ingredient = {id: 0, name: '', quantity: 0, unity: '', peremptionDate: d};

      this.navCtrl.push(EditIngredientPage, { ingredient: ingredient, type: "add", shoppingListId: this.shoppingListToEdit.id })
      //this.shoppingListToEdit.ingredientList.push(ingredient);
      // this.addIngredientModal.hide();
    }
  
    deleteIngredient(ingredient: Ingredient): void {
      this.shoppingListToEdit.ingredientList.splice(this.shoppingListToEdit.ingredientList.indexOf(ingredient), 1);
    }

    addIngredientsToFridge(): void {
      for (let i = 0; i < this.ingredientsToAdd.length; i++) {
        this.fridgeService.addIngredient(this.ingredientsToAdd[i]);
        this.shoppingListToEdit.ingredientList.splice(this.shoppingListToEdit.ingredientList.indexOf(this.ingredientsToAdd[i]), 1);
      }
      // this.confirmModal.hide();
    }
  
    addAllIngredientsToFridge(): void {
      for (let i = 0; i < this.shoppingListToEdit.ingredientList.length; i++) {
        this.fridgeService.addIngredient(this.shoppingListToEdit.ingredientList[i]);
      }
      this.shoppingListService.removeShoppingList(this.shoppingListToEdit);
      this.shoppingListToEdit = null;
      // this.confirmModal.hide();
    }

    selectIngredient(e, ingredient) {
      if (e.target.checked) {
        this.ingredientsToAdd.push(ingredient);
      }else {
        this.ingredientsToAdd.splice(this.ingredientsToAdd.indexOf(ingredient), 1);
      }
    }

    validate(){
      this.navCtrl.pop();
    }
}

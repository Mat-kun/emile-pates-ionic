import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IngredientService } from '../../services/implementations/ingredient.service';
import { FridgeService } from '../../services/implementations/fridge.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';

import { ShoppingList } from '../../models/shopping-list';
import { Ingredient } from '../../models/Ingredient';



/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, public ingredientService: IngredientService,
    public fridgeService: FridgeService,
    public shoppingListService: ShoppingListService) {
  }

  shoppingListToEdit: ShoppingList;
  myShoppingsList: ShoppingList[];
  ingredientsToAdd: Ingredient[];

  newIngredient: Ingredient;

  // @ViewChild('confirmModal')
  // confirmModal: ModalDirective;
  // @ViewChild('addIngredientModal')
  // addIngredientModal: ModalDirective;

  ngOnInit() {
    this.shoppingListToEdit = null;
    this.getMyShoppingList();
    const d = new Date();
    d.setDate(d.getDate() + 14);
    this.newIngredient = {id: 0, name: '', quantity: 0, unity: '', peremptionDate: d};
  }

  getMyShoppingList(): void {
    this.myShoppingsList = this.shoppingListService.getShoppingList();
  }

  prepareForEditShoppingList(shopping: ShoppingList): void {
    this.ingredientsToAdd = [];
    this.shoppingListToEdit = shopping;
  }

  selectIngredient(e, ingredient) {
    if (e.target.checked) {
      this.ingredientsToAdd.push(ingredient);
    }else {
      this.ingredientsToAdd.splice(this.ingredientsToAdd.indexOf(ingredient), 1);
    }
  }

  prepareForAddIngredient(): void {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    this.newIngredient = {id: 0, name: '', quantity: 0, unity: '', peremptionDate: d};
    // this.addIngredientModal.show();
  }

  addIngredient(ingredient: Ingredient): void {
    this.shoppingListToEdit.ingredientList.push(ingredient);
    // this.addIngredientModal.hide();
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.shoppingListToEdit.ingredientList.splice(this.shoppingListToEdit.ingredientList.indexOf(ingredient), 1);
  }

  showValidation() {
    // this.confirmModal.show();
  }

  deleteShoppingList(shoppingList: ShoppingList): void {
    this.shoppingListService.removeShoppingList(shoppingList);
    if (shoppingList.id === this.shoppingListToEdit.id) {
      this.shoppingListToEdit = null;
    }
    // this.confirmModal.hide();
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

  // Pour edition dans le cas d'ajout d'une BDD
  editShoppingList(shoppingList: ShoppingList): void {
    this.shoppingListService.editShoppingList(shoppingList);
    // this.confirmModal.hide();
  }

}

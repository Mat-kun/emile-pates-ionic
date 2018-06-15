import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Ingredient} from '../../models/ingredient';
import { FridgePage } from '../fridge/fridge';
import { FridgeService } from '../../services/implementations/fridge.service'
import { ShoppingListService } from '../../services/implementations/shopping-list.service';
import { ShoppingList } from '../../models/shopping-list';

/**
 * Generated class for the EditIngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-ingredient',
  templateUrl: 'edit-ingredient.html',
})
export class EditIngredientPage implements OnInit {

  // ingredientToEdit:Ingredient;
  ingredientToEdit = {id: 0, name: '', quantity: 0, unity: '', peremptionDate: new Date()};
  editionMode: boolean;
  shoppingListId: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fridgeService: FridgeService,
    public shoppingListService: ShoppingListService
  
  ) {
  }

  ngOnInit(){
    this.shoppingListId = -1
    this.ingredientToEdit = this.navParams.data.ingredient;
    if(this.navParams.data.type == "edit"){
      this.editionMode = true;
    }else{
      this.editionMode = false;
    }
    if (this.navParams.data.shoppingListId !== undefined && this.navParams.data.shoppingListId !== -1){
      this.shoppingListId = this.navParams.data.shoppingListId;
    }
  }

  register(){
    if (this.shoppingListId === -1){
      if(this.editionMode){
        this.fridgeService.editIngredient(this.ingredientToEdit);          
      }else{
        this.fridgeService.addIngredient(this.ingredientToEdit);
      }
    } else {
      if(this.editionMode){
        throw new Error("Not Implemented");
      }else{
        this.shoppingListService.getShoppingListById(this.shoppingListId).ingredientList.push(this.ingredientToEdit);
      }
    }
    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }

}

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Ingredient} from '../../models/ingredient';
import { FridgePage } from '../fridge/fridge';
import { FridgeService } from '../../services/implementations/fridge.service'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public fridgeService: FridgeService) {
  }

  ngOnInit(){
    this.ingredientToEdit = this.navParams.data.ingredient;
    if(this.navParams.data.type == "edit"){
      this.editionMode = true;
    }else{
      this.editionMode = false;
    }
  }

  register(){
    if(this.editionMode){
      this.fridgeService.editIngredient(this.ingredientToEdit);          
    }else{
      this.fridgeService.addIngredient(this.ingredientToEdit);
      
    }
    this.navCtrl.push(FridgePage);
  }

  cancel(){
    this.navCtrl.push(FridgePage);
  }

}

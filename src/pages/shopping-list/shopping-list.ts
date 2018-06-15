import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { IngredientService } from '../../services/implementations/ingredient.service';
import { FridgeService } from '../../services/implementations/fridge.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';

import { ShoppingList } from '../../models/shopping-list';
import { Ingredient } from '../../models/Ingredient';
import { EditShoppingListPage } from '../edit-shopping-list/edit-shopping-list';



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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public ingredientService: IngredientService,
    public fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
    public alertController: AlertController,
  ) {
  }
  myShoppingsList: ShoppingList[];

  // @ViewChild('confirmModal')
  // confirmModal: ModalDirective;
  // @ViewChild('addIngredientModal')
  // addIngredientModal: ModalDirective;

  ngOnInit() {
    this.getMyShoppingList();
  }

  getMyShoppingList(): void {
    this.myShoppingsList = this.shoppingListService.getShoppingList();
  }

  editShoppingList(shopping: ShoppingList): void {
    this.navCtrl.push(EditShoppingListPage, { shoppingListToEdit: shopping, type: "edit" });
  }

  deleteShoppingList(shoppingList: ShoppingList): void {
    const confirm = this.alertController.create({
      title: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer cette liste ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.shoppingListService.removeShoppingList(shoppingList);
          }
        }
      ]
    });
    confirm.present();
  }
}

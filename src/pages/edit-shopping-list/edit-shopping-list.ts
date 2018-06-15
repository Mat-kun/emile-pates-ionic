import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShoppingList } from '../../models/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { FridgeService } from '../../services/implementations/fridge.service';
import { ShoppingListService } from '../../services/implementations/shopping-list.service';
import { EditIngredientPage } from '../edit-ingredient/edit-ingredient';
import { IngredientService } from '../../services/implementations/ingredient.service';
import { FridgePage } from '../fridge/fridge';

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
export class EditShoppingListPage implements OnInit {
  shoppingListToEdit: ShoppingList;
  editionMode: boolean;
  ingredientsToAdd: Ingredient[];
  pageName: string = "Edit Shopping List";

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fridgeService: FridgeService,
    public shoppingListService: ShoppingListService,
  ) {
  }

  ngOnInit(): void {
    this.ingredientsToAdd = [];
    this.shoppingListToEdit = this.navParams.data.shoppingListToEdit;
    this.pageName = this.shoppingListToEdit.name;
    if (this.navParams.data.type == "edit") {
      this.editionMode = true;
    } else {
      this.editionMode = false;
    }
  }

  addIngredient(): void {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    let ingredient: Ingredient = { id: 0, name: '', quantity: 0, unity: '', peremptionDate: d };

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
    //console.log(this.ingredientsToAdd);
    if (e.checked) {
      this.ingredientsToAdd.push(ingredient);
    } else {
      this.ingredientsToAdd.splice(this.ingredientsToAdd.indexOf(ingredient), 1);
    }
  }

  validate() {
    let alert = this.alertController.create({
      title: 'Validation',
      message: "Souhaitez-vous enregistrer des modifications a cette liste de courses ?\n"
        + "Valider certains achats ou tous ?\n"
        + "Ou même supprimer la liste ?",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }, {
          text: 'Ajouter les ingrédients sélectionnés',
          handler: () => {
            this.addIngredientsToFridge();
            this.navCtrl.setRoot(FridgePage);
          }
        }, {
          text: 'Tout ajouter',
          handler: () => {
            this.addAllIngredientsToFridge();
            this.navCtrl.setRoot(FridgePage);
          }
        }
      ]
    });
    alert.present();
  }
}

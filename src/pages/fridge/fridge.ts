import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FridgeService } from '../../services/implementations/fridge.service';
import {Ingredient} from '../../models/ingredient';

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

  // @ViewChild('editOrAddModal')
  // editOrAddModal: ModalDirective;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fridgeService: FridgeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FridgePage');
  }
  ngOnInit() {
    this.getIngredients();
    this.creationMode = false;
    this.editionMode = false;
  }

  prepareForEditIngredient(ingredient: Ingredient): void {
    // this.ingredientToEdit = _.clone(ingredient);
    // const name: string = this.ingredientToEdit.name;
    // this.editionMode = true;
    // this.editOrAddModal.show();
  }

  editIngredient(ingredient: Ingredient): void {
    this.fridgeService.editIngredient(ingredient);
    this.editionMode = false;
    // this.editOrAddModal.hide();
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
    // this.editOrAddModal.show();
  }

  addIngredient(ingredient: Ingredient): void {
    this.fridgeService.addIngredient(ingredient);
    this.creationMode = false;
    // this.editOrAddModal.hide();
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

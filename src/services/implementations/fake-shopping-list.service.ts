import { Injectable } from '@angular/core';
import { IShoppingListService } from '../interfaces/shopping-list-service';
import { Ingredient } from '../../models/ingredient';
import { ShoppingList } from '../../models/shopping-list';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class FakeShoppingListService implements IShoppingListService {
 private shoppingsList: ShoppingList[] = [];
 private newId = 1;

  getShoppingList(): ShoppingList[] {
    return this.shoppingsList;
  }

  getShoppingListById(id: number): ShoppingList {
    let toReturn: ShoppingList;
    this.shoppingsList.forEach((shoppingList: ShoppingList): void => {
      if (shoppingList.id === id) {
        toReturn = shoppingList;
      }
    });
    return toReturn;
  }

  removeShoppingList(shoppingList: ShoppingList): void {
    this.shoppingsList.splice(this.shoppingsList.indexOf(this.getShoppingListById(shoppingList.id)), 1);
  }

  editShoppingList(shoppingList: ShoppingList): void {
    this.shoppingsList[this.shoppingsList.indexOf(this.getShoppingListById(shoppingList.id))] = shoppingList;
  }

  addShoppingList(shoppingList: ShoppingList): void {
    shoppingList.id = this.newId;
    this.shoppingsList.push(shoppingList);
    this.newId ++;
  }

  constructor() {
    const d = new Date();
    d.setDate(d.getDate() + 14);

    const mayo: Ingredient = {id: 0, name: 'mayonnaise', quantity: 25, unity: 'g', peremptionDate: d};
    const poulet: Ingredient = {id: 1, name: 'poulet', quantity: 300, unity: 'g', peremptionDate: d};
    const emmental: Ingredient = {id: 2, name: 'emmental', quantity: 250, unity: 'g', peremptionDate: d};
    const lait: Ingredient = {id: 3, name: 'lait', quantity: 1, unity: 'l', peremptionDate: d};
    const tomate: Ingredient = {id: 4, name: 'tomates', quantity: 100, unity: 'g', peremptionDate: d};

    const ingredientList: Ingredient[] = [];
    ingredientList.push(mayo, poulet, emmental, lait, tomate);

    const myShoppingList: ShoppingList = {id: 0, name: 'Ma Liste de course', ingredientList: ingredientList};
    this.shoppingsList.push(myShoppingList);
  }

}

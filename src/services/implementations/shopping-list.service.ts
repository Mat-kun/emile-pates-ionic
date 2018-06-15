import { Injectable } from '@angular/core';
import { IShoppingListService } from '../interfaces/shopping-list-service';
import { ShoppingList } from '../../models/shopping-list';

@Injectable()
export class ShoppingListService implements IShoppingListService {
  getShoppingList(): ShoppingList[] {
    throw new Error('Method not implemented.');
  }

  getShoppingListById(id: number): ShoppingList {
    throw new Error('Method not implemented.');
  }

  removeShoppingList(shoppingList: ShoppingList) {
    throw new Error('Method not implemented.');
  }

  editShoppingList(shoppingList: ShoppingList) {
    throw new Error('Method not implemented.');
  }

  addShoppingList(shoppingList: ShoppingList): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}

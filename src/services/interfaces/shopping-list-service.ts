import { ShoppingList } from '../../models/shopping-list';

export interface IShoppingListService {
    getShoppingList(): ShoppingList[];
}

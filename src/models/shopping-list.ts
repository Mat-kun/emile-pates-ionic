import { Ingredient } from './ingredient';

export interface ShoppingList {
    id?: number;
    name: string;
    ingredientList: Ingredient[];
}

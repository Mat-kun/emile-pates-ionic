import { Ingredient } from '../../models/ingredient';

export interface IFridgeService {
    addIngredient(ingredient: Ingredient): void;

    removeIngredient(ingredient: Ingredient): void;

    getFridgeIngredients(): Ingredient[];

    editIngredient(ingredient: Ingredient): void;

    getIngredientById(id: number): Ingredient;
}

import { Ingredient } from '../../models/ingredient';

export interface IIngredientService {
    addIngredient(ingredient: Ingredient): void;

    removeIngredient(ingredient: Ingredient): void;

    editIngredient(ingredient: Ingredient): void;

    getAllIngredients(): Ingredient[];

    getIngredientById(id: number): Ingredient;

    getIngredientByName(name: string): Ingredient;
}

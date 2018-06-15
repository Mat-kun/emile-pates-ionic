import {Recipe } from '../../models/recipe';

export interface IRecipeService {
    addRecipe(recipe: Recipe): void;

    removeRecipe(recipe: Recipe): void;

    editRecipe(recipe: Recipe): void;

    getRecipeById(id: number): Recipe;

    getAllRecipes(): Recipe[];
}

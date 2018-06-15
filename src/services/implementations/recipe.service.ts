import { Injectable } from '@angular/core';
import { IRecipeService } from '../interfaces/recipe-service';
import { Recipe } from '../../models/recipe';

@Injectable()
export class RecipeService implements IRecipeService {
  getAllRecipes(): Recipe[] {
    throw new Error('Method not implemented.');
  }
  addRecipe(recipe: Recipe): void {
    throw new Error('Method not implemented.');
  }
  removeRecipe(recipe: Recipe): void {
    throw new Error('Method not implemented.');
  }
  editRecipe(recipe: Recipe): void {
    throw new Error('Method not implemented.');
  }
  getRecipeById(id: number): Recipe {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}

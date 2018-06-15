import { Injectable } from '@angular/core';
import { IIngredientService } from '../interfaces/ingredient-service';
import { Ingredient } from '../../models/ingredient';

@Injectable()
export class IngredientService implements IIngredientService {
  getAllIngredients(): Ingredient[] {
    throw new Error('Method not implemented.');
  }
  addIngredient(ingredient: Ingredient): void {
    throw new Error('Method not implemented.');
  }
  removeIngredient(ingredient: Ingredient): void {
    throw new Error('Method not implemented.');
  }
  editIngredient(ingredient: Ingredient): void {
    throw new Error('Method not implemented.');
  }
  getIngredientById(id: number): Ingredient {
    throw new Error('Method not implemented.');
  }
  getIngredientByName(name: string): Ingredient {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}

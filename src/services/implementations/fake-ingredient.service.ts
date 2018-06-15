import { Injectable } from '@angular/core';
import { IIngredientService } from '../interfaces/ingredient-service';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from './ingredient.service';

@Injectable()
export class FakeIngredientService implements IIngredientService {

  private ingredientsList: Ingredient[] = [];

  private newId = 1;

  addIngredient(ingredient: Ingredient): void {
    ingredient.id = this.newId;
    this.ingredientsList.push(ingredient);
    this.newId ++;
  }

  removeIngredient(ingredient: Ingredient): void {
    this.ingredientsList.splice(this.ingredientsList.indexOf(this.getIngredientById(ingredient.id)), 1);
  }

  editIngredient(ingredient: Ingredient): void {
    this.ingredientsList[this.ingredientsList.indexOf(this.getIngredientById(ingredient.id))] = ingredient;
  }

  getAllIngredients(): Ingredient[] {
    return this.ingredientsList;
  }

  getIngredientById(id: number): Ingredient {
    let toReturn: Ingredient;
    this.ingredientsList.forEach((ingredient: Ingredient): void => {
      if (ingredient.id === id) {
        toReturn = ingredient;
      }
    });
    return toReturn;
  }

  getIngredientByName(name: string): Ingredient {
    let toReturn: Ingredient;
    this.ingredientsList.forEach((ingredient: Ingredient): void => {
      if (ingredient.name === name) {
        toReturn = ingredient;
      }
    });
    return toReturn;
  }


  // private getAvailableId(): number {
  //   if (this.ingredientsList.length === 0) {
  //     return 1;
  //   }
  //   return (this.ingredientsList[this.ingredientsList.length - 1 ].id) + 1;
  // }

  constructor() { }

}

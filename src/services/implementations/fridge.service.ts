import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient';
import { IFridgeService } from '../interfaces/fridge-service';

@Injectable()
export class FridgeService implements IFridgeService {

    addIngredient(ingredient: Ingredient): void {
      throw Error('Not implemented');
    }

    removeIngredient(ingredient: Ingredient): void {
      throw Error('Not implemented');
    }

    getFridgeIngredients(): Ingredient[] {
      throw Error('Not implemented');
    }

    editIngredient(ingredient: Ingredient): void {
      throw new Error('Method not implemented.');
    }

    getIngredientById(id: number): Ingredient {
      throw new Error('Method not implemented.');
    }

    constructor() { }

}

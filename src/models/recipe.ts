import { Ingredient } from './ingredient';

export interface Recipe {
    id?: number;
    name: string;
    description: string;
    ingredientList: Ingredient[];
    imgPath: string;
}

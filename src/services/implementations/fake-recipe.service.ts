import { Injectable } from '@angular/core';
import { IRecipeService } from '../interfaces/recipe-service';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';

@Injectable()
export class FakeRecipeService implements IRecipeService {

  private recipes: Recipe[] = [];

  private newId = 1;

  getAllRecipes(): Recipe[] {
    return this.recipes;
  }
  addRecipe(recipe: Recipe): void {
    recipe.id = this.newId;
    this.recipes.push(recipe);
    this.newId++;
  }
  removeRecipe(recipe: Recipe): void {
    this.recipes.splice(this.recipes.indexOf(this.getRecipeById(recipe.id)), 1);
  }
  editRecipe(recipe: Recipe): void {
    this.recipes[this.recipes.indexOf(this.getRecipeById(recipe.id))] = recipe;
  }
  getRecipeById(id: number): Recipe {
    let toReturn: Recipe;
    this.recipes.forEach((recipe: Recipe): void => {
      if (recipe.id === id) {
        toReturn = recipe;
      }
    });
    return toReturn;
  }

  constructor() {
    // Peremption Date
    const d = new Date('June 01, 2018');
    const d2 = new Date('February 02, 2018');
    const d3 = new Date('December 24, 2018');
    // Ingredients
    const oeufs: Ingredient = {id: 0, name: 'Oeufs', quantity: 2, unity: 'number', peremptionDate: d};
    const pates: Ingredient = {id: 1, name: 'Pates', quantity: 500, unity: 'g', peremptionDate: d};
    const creme: Ingredient = {id: 2, name: 'Creme fraiche', quantity: 25, unity: 'cl', peremptionDate: d2};
    const lardons: Ingredient = {id: 3, name: 'Lardons', quantity: 250, unity: 'g', peremptionDate: d3};
    const ail: Ingredient = {id: 4, name: 'Ail', quantity: 5, unity: 'g', peremptionDate: d};

    const choco: Ingredient = {id: 5, name: 'Chocolat', quantity: 200, unity: 'g', peremptionDate: d};
    const sucre: Ingredient = {id: 6, name: 'Sucre', quantity: 150, unity: 'g', peremptionDate: d};
    const farine: Ingredient = {id: 7, name: 'Farine', quantity: 100, unity: 'g', peremptionDate: d};
    const oeufsDessert: Ingredient = {id: 8, name: 'Oeufs', quantity: 4, unity: 'number', peremptionDate: d};
    const cremeLiquide: Ingredient = {id: 9, name: 'Creme fraiche liquide', quantity: 20, unity: 'cl', peremptionDate: d};
    const levure: Ingredient = {id: 10, name: 'Levure Chimique', quantity: 1, unity: 'number', peremptionDate: d};
    const sucreVanille: Ingredient = {id: 11, name: 'Sucre Vanillé', quantity: 1, unity: 'number', peremptionDate: d};

    // Image Path
    const carboJpg = '../../../assets/imgs/carbo.jpeg';
    const gateauJpg = '../../../assets/imgs/gateau.jpg';

    // description
    // tslint:disable-next-line:max-line-length
    const description1 = 'Si vous avez envie de préparer un savoureux gâteau fondant au chocolat sans matière grasse, d’une texture fondante, vous allez adorer cette recette. En effet celle-ci vous propose de réaliser un succulent gâteau au chocolat sans beurre au goût dense et vous verrez que le résultat est aussi savoureux et gourmand qu’avec une recette traditionnelle.';
    const description2 = 'Les pâtes à la carbonara est un plat traditionnel italien. La recette 100% italienne ne veut pas que l on ajoute de creme fraîche, habitude typiquement française Mais c est tellement bon qu on s en privera pas.';
    // Recipes
    // tslint:disable-next-line:max-line-length
    const patesCarbo: Recipe = {id: 0, name: 'Pates Carbonara', ingredientList: [oeufs, pates, creme, lardons, ail], imgPath: carboJpg, description: description2};
    // tslint:disable-next-line:max-line-length
    const gateau: Recipe = {id: 1, name: 'Gateau Au Chocolat', ingredientList: [choco, sucre, farine, oeufsDessert, cremeLiquide], imgPath: gateauJpg, description: description1};

    //const test: Recipe = {id: 0, name: 'test', ingredientList: [oeufs], imgPath: carboJpg, description: description2};
    this.recipes.push(patesCarbo, gateau);
  }

}

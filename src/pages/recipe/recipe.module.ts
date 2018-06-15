import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipePage } from './recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

@NgModule({
  declarations: [
    RecipePage,
    EditRecipePage
  ],
  imports: [
    IonicPageModule.forChild(RecipePage),
    IonicPageModule.forChild(EditRecipePage)
  ],
})
export class RecipePageModule {}

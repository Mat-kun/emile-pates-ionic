import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditIngredientPage } from './edit-ingredient';

@NgModule({
  declarations: [
    EditIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(EditIngredientPage),
  ],
})
export class EditIngredientPageModule {}

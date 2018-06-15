import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FridgePage } from './fridge';
import { EditIngredientPage } from '../edit-ingredient/edit-ingredient';

@NgModule({
  declarations: [
    FridgePage,
    EditIngredientPage  
  ],
  imports: [
    IonicPageModule.forChild(FridgePage),
    IonicPageModule.forChild(EditIngredientPage)
  ],
})
export class FridgePageModule {}

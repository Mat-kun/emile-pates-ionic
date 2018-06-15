import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';
import { EditShoppingListPage } from '../edit-shopping-list/edit-shopping-list';

@NgModule({
  declarations: [
    ShoppingListPage,
    EditShoppingListPage
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage),
    IonicPageModule.forChild(EditShoppingListPage)
  ],
})
export class ShoppingListPageModule {}

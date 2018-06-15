import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlanningPageModule } from '../pages/planning/planning.module';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { FridgePageModule } from '../pages/fridge/fridge.module';
import { RecipePageModule } from '../pages/recipe/recipe.module';

import { FridgeService } from '../services/implementations/fridge.service';
import { FakeFridgeService } from '../services/implementations/fake-fridge.service';
import { IngredientService } from '../services/implementations/ingredient.service';
import { FakeIngredientService } from '../services/implementations/fake-ingredient.service';
import { PlanningService } from '../services/implementations/planning.service';
import { FakePlanningService } from '../services/implementations/fake-planning.service';
import { RecipeService } from '../services/implementations/recipe.service';
import { FakeRecipeService } from '../services/implementations/fake-recipe.service';
import { ShoppingListService } from '../services/implementations/shopping-list.service';
import { FakeShoppingListService } from '../services/implementations/fake-shopping-list.service';
import { EditIngredientPageModule } from '../pages/edit-ingredient/edit-ingredient.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    FridgePageModule,
    RecipePageModule,
    PlanningPageModule,
    ShoppingListPageModule,
    EditIngredientPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: FridgeService, useClass: FakeFridgeService},
    {provide: IngredientService, useClass: FakeIngredientService},
    {provide: PlanningService, useClass: FakePlanningService},
    {provide: RecipeService, useClass: FakeRecipeService},
    {provide: ShoppingListService, useClass: FakeShoppingListService}
  ]
})
export class AppModule {}

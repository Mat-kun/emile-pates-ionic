import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanningPage } from './planning';
import { EditPlanningPage } from '../edit-planning/edit-planning';

@NgModule({
  declarations: [
    PlanningPage,
    EditPlanningPage
  ],
  imports: [
    IonicPageModule.forChild(PlanningPage),
    IonicPageModule.forChild(EditPlanningPage),
    
  ],
})
export class PlanningPageModule {}

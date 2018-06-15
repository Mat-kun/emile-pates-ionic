import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPlanningPage } from './edit-planning';

@NgModule({
  declarations: [
    EditPlanningPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPlanningPage),
  ],
})
export class EditPlanningPageModule {}

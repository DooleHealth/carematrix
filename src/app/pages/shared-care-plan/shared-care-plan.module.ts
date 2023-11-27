import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedCarePlanPageRoutingModule } from './shared-care-plan-routing.module';

import { SharedCarePlanPage } from './shared-care-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedCarePlanPageRoutingModule
  ],
  declarations: [SharedCarePlanPage]
})
export class SharedCarePlanPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityGoalPageRoutingModule } from './activity-goal-routing.module';

import { ActivityGoalPage } from './activity-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityGoalPageRoutingModule
  ],
  declarations: [ActivityGoalPage]
})
export class ActivityGoalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityGoalPageRoutingModule } from './activity-goal-routing.module';

import { ActivityGoalPage } from './activity-goal.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReminderAddPageModule } from '../../agenda/reminder-add/reminder-add.module';
import { ReminderAddPage } from '../../agenda/reminder-add/reminder-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityGoalPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [ActivityGoalPage],
  providers:[DatePipe]
})
export class ActivityGoalPageModule {}

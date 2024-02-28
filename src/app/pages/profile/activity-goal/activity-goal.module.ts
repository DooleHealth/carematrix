import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityGoalPageRoutingModule } from './activity-goal-routing.module';

import { ActivityGoalPage } from './activity-goal.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReminderAddPageModule } from '../../agenda/reminder-add/reminder-add.module';
import { ReminderAddPage } from '../../agenda/reminder-add/reminder-add.page';
import { ElementsAddPageModule } from '../../tracking/elements-add/elements-add.module';
import { ShareModule } from 'src/app/shared/share/share.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityGoalPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ShareModule,
    ElementsAddPageModule,
    ComponentsModule,
  ],
  declarations: [ActivityGoalPage],
  providers:[DatePipe, TitleCasePipe]
})
export class ActivityGoalPageModule {}

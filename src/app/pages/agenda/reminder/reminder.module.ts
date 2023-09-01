import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderPageRoutingModule } from './reminder-routing.module';

import { ReminderPage } from './reminder.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReminderAddPageModule } from '../reminder-add/reminder-add.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ElementsAddPageModule } from '../../tracking/elements-add/elements-add.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReminderPageRoutingModule,   
    TranslateModule,
    ShareModule,
    ReminderAddPageModule,
    ElementsAddPageModule,
  ],
  declarations: [ReminderPage]
})
export class ReminderPageModule {}

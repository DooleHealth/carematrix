import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderAddPageRoutingModule } from './reminder-add-routing.module';

import { ReminderAddPage } from './reminder-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReminderAddPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ReminderAddPage]
})
export class ReminderAddPageModule {}

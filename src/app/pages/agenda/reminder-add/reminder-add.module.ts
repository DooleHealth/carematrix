import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderAddPageRoutingModule } from './reminder-add-routing.module';

import { ReminderAddPage } from './reminder-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ReminderAddPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ReminderAddPage],
  providers: [ DatePipe]
})
export class ReminderAddPageModule {}

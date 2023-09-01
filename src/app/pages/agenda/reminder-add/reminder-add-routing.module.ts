import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ReminderAddPage } from './reminder-add.page';

const routes: Routes = [
  {
    path: '',
    component: ReminderAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class ReminderAddPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReminderAddPage } from './reminder-add.page';

const routes: Routes = [
  {
    path: '',
    component: ReminderAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReminderAddPageRoutingModule {}

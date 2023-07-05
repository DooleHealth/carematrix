import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmFormPage } from './alarm-form.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmFormPageRoutingModule {}

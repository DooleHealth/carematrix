import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReminderPage } from './reminder.page';

const routes: Routes = [
  {
    path: '',
    component: ReminderPage
  }  ,
  {
    path: 'doctor',
    loadChildren: () => import('../../contact/doctors/doctors.module').then( m => m.DoctorsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReminderPageRoutingModule {}

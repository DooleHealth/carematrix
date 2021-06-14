import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendaPage } from './agenda.page';

const routes: Routes = [
  {
    path: '',
    component: AgendaPage
  },
  {
    path: 'list-appointment',
    loadChildren: () => import('./list-appointment/list-appointment.module').then( m => m.ListAppointmentPageModule)
  },
  {
    path: 'reminder',
    loadChildren: () => import('./reminder/reminder.module').then( m => m.ReminderPageModule)
  }
  ,
  {
    path: 'reminder-add',
    loadChildren: () => import('./reminder-add/reminder-add.module').then( m => m.ReminderAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaPageRoutingModule {}

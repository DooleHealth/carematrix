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
  },
  {
    path: 'reminder-add',
    loadChildren: () => import('./reminder-add/reminder-add.module').then( m => m.ReminderAddPageModule)
  },
  {
    path: 'videocall',
    loadChildren: () => import('./videocall/videocall.module').then( m => m.VideocallPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./agenda-detail/agenda-detail.module').then( m => m.AgendaDetailPageModule)
  },
  {
    path: 'agenda-edit',
    loadChildren: () => import('./agenda-edit/agenda-edit.module').then( m => m.AgendaEditPageModule)
  },
  {
    path: 'agenda-detail',
    loadChildren: () => import('./agenda-detail/agenda-detail.module').then( m => m.AgendaDetailPageModule)
  },
  {
    path: 'videocall-iframe',
    loadChildren: () => import('./videocall-iframe/videocall-iframe.module').then( m => m.VideocallIframePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaPageRoutingModule {}

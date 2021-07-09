import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAppointmentPage } from './list-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ListAppointmentPage
  },
  {
    path: 'detail',
    loadChildren: () => import('../agenda-detail/agenda-detail.module').then( m => m.AgendaDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAppointmentPageRoutingModule {}

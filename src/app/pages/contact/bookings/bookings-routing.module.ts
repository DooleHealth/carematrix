import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingsPage } from './bookings.page';

const routes: Routes = [
  {
    path: '',
    component: BookingsPage
  },
  {
    path: 'medical-calendar',
    loadChildren: () => import('../medical-calendar/medical-calendar.module').then(m => m.MedicalCalendarPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('../payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'detailCard',
    loadChildren: () => import('../../profile/cards/detail-health-card/detail-health-card.module').then( m => m.DetailHealthCardPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingsPageRoutingModule { }

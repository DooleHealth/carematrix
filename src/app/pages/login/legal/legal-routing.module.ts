import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LegalPage } from './legal.page';

const routes: Routes = [
  {
    path: '',
    component: LegalPage
  },
  {
    path: 'sms',
    loadChildren: () => import('../sms/sms.module').then( m => m.SmsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalPageRoutingModule {}

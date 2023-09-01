import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsPage } from './sms.page';

const routes: Routes = [
  {
    path: '',
    component: SmsPage
  },
  {
    path: 'verification',
    loadChildren: () => import('../verification/verification.module').then( m => m.VerificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsPageRoutingModule {}

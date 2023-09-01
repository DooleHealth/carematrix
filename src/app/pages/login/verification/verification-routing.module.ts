import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationPage } from './verification.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage
  },
  {
    path: 'intro',
    loadChildren: () => import('../../onboarding/intro/intro.module').then( m => m.IntroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationPageRoutingModule {}

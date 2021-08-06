import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiometricAuthPage } from './biometric-auth.page';

const routes: Routes = [
  {
    path: '',
    component: BiometricAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiometricAuthPageRoutingModule {}

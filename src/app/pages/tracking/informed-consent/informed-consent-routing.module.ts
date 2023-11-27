import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformedConsentPage } from './informed-consent.page';

const routes: Routes = [
  {
    path: '',
    component: InformedConsentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformedConsentPageRoutingModule {}
